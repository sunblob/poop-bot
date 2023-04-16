import {
  INestApplication,
  INestApplicationContext,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaClient } from 'database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['info', 'query', 'error', 'warn'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication | INestApplicationContext) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
