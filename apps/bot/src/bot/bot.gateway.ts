import { Injectable } from '@nestjs/common';
import { AttachmentBuilder } from 'discord.js';
import { Context, ContextOf, On, Once } from 'necord';
import { GuildsService } from 'src/guilds/guilds.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotGateway {
  constructor(
    private guildService: GuildsService,
    private prisma: PrismaService,
  ) {}

  @Once('ready')
  onReady(@Context() [client]: ContextOf<'ready'>) {
    console.log(`Bot has started ${client.user.username}`);
  }

  @On('guildCreate')
  async onGuildJoin(@Context() [guild]: ContextOf<'guildCreate'>) {
    console.log(`Bot joined guild: ${guild.id}`);
    const dbGuild = await this.guildService.findOrCreateGuild(guild);

    console.log(dbGuild);
  }

  @On('guildDelete')
  onGuildLeave(@Context() [guild]: ContextOf<'guildDelete'>) {
    console.log(`Bot left guild: ${guild.id}`);
  }

  @On('messageCreate')
  async onMessageReceive(@Context() [message]: ContextOf<'messageCreate'>) {
    const guildUser = await this.prisma.guildUser.findFirst({
      where: {
        guildId: message.guildId,
        userId: message.member.id,
      },
    });

    if (!guildUser) return;

    const reactions = await this.prisma.reaction.findMany({
      where: {
        guildUserId: guildUser.id,
      },
    });

    // const image = new AttachmentBuilder('./files/eblan.png')

    // message.reply({

    // })

    Promise.all([
      reactions.forEach((reaction) => message.react(reaction.name)),
    ]);
  }

  // @On('guildAuditLogEntryCreate')
  // async onAuditLog() {}

  @On('error')
  async onError(@Context() [error]: ContextOf<'error'>) {
    console.log('Error occured: ', error);
  }
}
