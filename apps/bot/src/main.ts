import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Makes sure prisma disconnects with app
  const prismaService = app.get<PrismaService>(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>('PORT');

  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Poop-bot is listening on port ${PORT}`);
  });
}

bootstrap();
