import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { GuildsModule } from './guilds/guilds.module';
import { UsersModule } from './users/users.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    // Config module
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    BotModule,
    GuildsModule,
    UsersModule,
    ReactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
