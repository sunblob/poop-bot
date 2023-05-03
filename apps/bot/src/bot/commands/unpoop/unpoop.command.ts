import { Injectable, ValidationPipe } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { UnPoopDto } from './dto/unpoop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UnPoopCommand {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  @SlashCommand({
    name: 'unpoop',
    description: 'Removes a specific emoji reaction from user',
  })
  public async onUnPoop(
    @Context() [interaction]: SlashCommandContext,
    @Options(new ValidationPipe()) { guildMember, emoji }: UnPoopDto,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: guildMember.id,
      },
    });

    const guildUser = await this.prisma.guildUser.findFirst({
      where: {
        userId: user.id,
        guildId: interaction.guildId,
      },
    });

    const calledUser = await this.userService.findOrCreateUser(
      interaction.user.id,
    );

    const calledGuildUser = await this.userService.findOrCreateGuildUser(
      calledUser.id,
      interaction.guildId,
    );

    if (user.id === interaction.user.id && guildUser.role !== 'ADMIN') {
      return interaction.reply({
        content: 'You cant unpoop urself',
        fetchReply: false,
        ephemeral: true,
      });
    }

    const emojiRegex = /\p{Extended_Pictographic}/gu;

    const isUnicodeEmoji = emojiRegex.test(emoji);

    const unicodeEmoji = isUnicodeEmoji ? emoji : '';

    let reactionEmoji = interaction.guild.emojis.cache.find(
      (e) => e.name === emoji,
    );

    if (!reactionEmoji) {
      reactionEmoji = interaction.guild.emojis.cache.get(
        emoji.replace(/(^<:\w+:)/gm, '').replace('>', ''),
      );
    }

    console.log('emoji', emoji);

    console.log('reactionEmoji: ', reactionEmoji);
    console.log('unicodeEmoji', unicodeEmoji);

    if (!unicodeEmoji && !reactionEmoji) {
      return interaction.reply({
        content: 'No emoji found',
        fetchReply: false,
        ephemeral: true,
      });
    }

    const emojiName = isUnicodeEmoji ? unicodeEmoji : reactionEmoji.id;

    const reaction = await this.prisma.reaction.findFirst({
      where: {
        name: emojiName,
        guildUserId: guildUser.id,
      },
    });

    if (!reaction) {
      return interaction.reply({
        content: 'User doesnt have this poop',
        fetchReply: false,
        ephemeral: true,
      });
    } else {
      await this.prisma.reaction.delete({
        where: {
          id: reaction.id,
        },
      });
    }

    await this.prisma.log.create({
      data: {
        type: 'COMMAND',
        action: 'UNPOOP',
        userId: calledGuildUser.id,
        targetUserId: guildUser.id,
      },
    });

    return interaction.reply({
      content: 'Successfully unpooped.',
      fetchReply: false,
      ephemeral: true,
    });
  }
}
