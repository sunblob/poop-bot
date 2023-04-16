import { GuildMember } from 'discord.js';
import { MemberOption, StringOption } from 'necord';

export class PoopDto {
  @StringOption({
    name: 'emoji',
    description: 'Emoji to react',
    required: true,
  })
  emoji: string;

  @MemberOption({
    name: 'user',
    description: 'User to apply emoji',
    required: true,
  })
  guildMember: GuildMember;
}
