import { GuildMember } from 'discord.js';
import { MemberOption, StringOption } from 'necord';

export class UnPoopDto {
  @MemberOption({
    name: 'user',
    description: 'User to unpoop',
    required: true,
  })
  guildMember: GuildMember;

  @StringOption({
    name: 'emoji',
    description: 'Emoji to react',
    required: true,
  })
  emoji: string;
}
