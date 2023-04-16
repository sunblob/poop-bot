import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GuildsService } from 'src/guilds/guilds.service';

@Injectable()
export class InitCommand {
  constructor(private guildService: GuildsService) {}

  @SlashCommand({
    name: 'init',
    description: 'Init the bot in current server if it doesnt have guild in db',
  })
  async onInit(@Context() [interaction]: SlashCommandContext) {
    const guild = await this.guildService.findOrCreateGuild(interaction.guild);

    console.log('guild', guild);

    interaction.reply({
      content: 'Init',
      ephemeral: true,
    });

    setTimeout(() => interaction.deleteReply(), 5000);
  }
}
