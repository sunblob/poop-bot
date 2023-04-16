import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GuildsService } from './guilds.service';

@Module({
  imports: [PrismaModule],
  providers: [GuildsService],
  exports: [GuildsService],
})
export class GuildsModule {}
