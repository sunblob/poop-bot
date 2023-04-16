import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReactionsService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateReaction(guildUserId: string, emoji: string) {
    let reaction = await this.prisma.reaction.findFirst({
      where: {
        name: emoji,
        guildUserId: guildUserId,
      },
    });

    if (!reaction) {
      reaction = await this.prisma.reaction.create({
        data: {
          guildUserId: guildUserId,
          name: emoji,
        },
      });
    }

    return reaction;
  }
}
