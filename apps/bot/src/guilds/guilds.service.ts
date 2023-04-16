import { Injectable, NotFoundException } from '@nestjs/common';
import { Guild } from 'database';
import { Guild as DiscordGuild } from 'discord.js';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuildsService {
  constructor(private readonly prisma: PrismaService) {}

  async createGuild(guild: DiscordGuild): Promise<Guild> {
    return await this.prisma.guild.create({
      data: { id: guild.id, name: guild.name, image: guild.iconURL() },
    });
  }

  async getGuildById(guildId: string): Promise<Guild> {
    const guild = await this.prisma.guild.findFirst({ where: { id: guildId } });

    if (!guild) {
      throw new NotFoundException({
        message: 'Guild was not found',
      });
    }

    return guild;
  }

  async findOrCreateGuild(dGuild: DiscordGuild) {
    let guild = await this.prisma.guild.findFirst({ where: { id: dGuild.id } });

    if (!guild) {
      guild = await this.createGuild(dGuild);
    }

    return guild;
  }

  async updateGuild(guildId: string): Promise<Guild> {
    const guild = await this.getGuildById(guildId);

    return await this.getGuildById(guildId);
  }
}
