import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class UnPoopAllCommand {
  @SlashCommand({
    name: 'unpoopall',
    description: 'Removes all emoji reactions from user',
  })
  public async onUnPoopAll(@Context() [interaction]: SlashCommandContext) {}
}
