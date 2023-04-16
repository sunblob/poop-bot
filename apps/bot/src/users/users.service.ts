import { Injectable } from '@nestjs/common';
import { GuildUser, User } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(userId: string): Promise<User> {
    let user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          id: userId,
        },
      });
    }

    return user;
  }

  async findOrCreateGuildUser(
    userId: string,
    guildId: string,
  ): Promise<GuildUser> {
    let guildUser = await this.prisma.guildUser.findFirst({
      where: {
        guildId: guildId,
        userId: userId,
      },
    });

    if (!guildUser) {
      guildUser = await this.prisma.guildUser.create({
        data: {
          userId: userId,
          guildId: guildId,
        },
      });
    }

    return guildUser;
  }
}
