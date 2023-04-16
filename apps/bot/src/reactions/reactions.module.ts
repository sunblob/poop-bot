import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReactionsService],
  exports: [ReactionsService],
})
export class ReactionsModule {}
