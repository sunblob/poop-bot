import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {} from 'discord.js';

@Catch(Error)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.log('Internal error: ', exception.message);

    if (exception.name == 'PrismaClientKnownRequestError') {
      console.log('Prisma error: ');
    }
  }
}
