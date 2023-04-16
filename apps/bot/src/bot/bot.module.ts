import { Module } from '@nestjs/common';
import { GuildsModule } from 'src/guilds/guilds.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotGateway } from './bot.gateway';
import { NecordModule } from 'necord';
import { BotConfig } from './bot.config';
import { PoopCommand } from './commands/poop/poop.command';
import { UnPoopAllCommand } from './commands/unpoop/unpoop-all.command';
import { UnPoopCommand } from './commands/unpoop/unpoop.command';
import { UsersModule } from 'src/users/users.module';
import { ReactionsModule } from 'src/reactions/reactions.module';

@Module({
  imports: [
    NecordModule.forRootAsync({
      useClass: BotConfig,
    }),
    UsersModule,
    ReactionsModule,
    PrismaModule,
    GuildsModule,
  ],
  providers: [BotGateway, PoopCommand, UnPoopAllCommand, UnPoopCommand],
  exports: [BotGateway],
})
export class BotModule {}
