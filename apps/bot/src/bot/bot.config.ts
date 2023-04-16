import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GatewayIntentBits } from 'discord.js';

@Injectable()
export class BotConfig {
  constructor(private configService: ConfigService) {}

  public createNecordOptions() {
    return {
      token: this.configService.get<string>('TOKEN'),
      intents: [
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
      ],
      development: this.configService.get<string[]>('DEV_GUILD'),
    };
  }
}
