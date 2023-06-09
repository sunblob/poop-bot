import { Injectable, ValidationPipe } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { PoopDto } from './dto/poop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { GuildsService } from 'src/guilds/guilds.service';

@Injectable()
export class PoopCommand {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private guildService: GuildsService,
  ) {}

  @SlashCommand({
    name: 'poop',
    description: 'Add emoji reaction to user',
  })
  public async onPoop(
    @Context() [interaction]: SlashCommandContext,
    @Options(new ValidationPipe()) { emoji, guildMember }: PoopDto,
  ) {
    console.log('EMOJI: ', emoji, 'USER: ', guildMember);

    const guild = await this.guildService.findOrCreateGuild(interaction.guild);

    const user = await this.userService.findOrCreateUser(guildMember.id);

    const guildUser = await this.userService.findOrCreateGuildUser(
      user.id,
      guild.id,
    );

    const calledUser = await this.userService.findOrCreateUser(
      interaction.user.id,
    );

    const calledGuildUser = await this.userService.findOrCreateGuildUser(
      calledUser.id,
      guild.id,
    );

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

    // const reaction = await this.reactionService.findOrCreateReaction(guildUser.guildId, emojiName)

    let reaction = await this.prisma.reaction.findFirst({
      where: {
        name: emojiName,
        guildUserId: guildUser.id,
      },
    });

    if (!reaction) {
      reaction = await this.prisma.reaction.create({
        data: {
          guildUserId: guildUser.id,
          name: emojiName,
        },
      });
    } else {
      return interaction.reply({
        content: 'User already has this reaction',
        fetchReply: false,
        ephemeral: true,
      });
    }

    await this.prisma.log.create({
      data: {
        type: 'COMMAND',
        action: 'POOP',
        userId: calledGuildUser.id,
        targetUserId: guildUser.id,
      },
    });

    return interaction.reply({
      content: 'Successfully pooped.',
      fetchReply: false,
      ephemeral: true,
    });
  }
}
