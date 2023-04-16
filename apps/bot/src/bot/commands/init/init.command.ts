import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GuildsService } from 'src/guilds/guilds.service';

export class InitCommand {
  constructor(private guildService: GuildsService) {}

  @SlashCommand({
    name: 'init',
    description: 'Init the bot in current server if it doesnt have guild in db',
  })
  async onInit(@Context() [interaction]: SlashCommandContext) {
    const guild = interaction.guild;

    await this.guildService.createGuild(guild);

    return interaction.reply({
      content: 'Init',
      ephemeral: true,
    });
  }
}
