import { Injectable, ValidationPipe } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdiotCommand {
  constructor(private prisma: PrismaService) {}

  @SlashCommand({
    name: 'idio',
    description: 'In development',
  })
  public async onPoop(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({
      content: 'you idio',
      ephemeral: true,
    });
  }
}
