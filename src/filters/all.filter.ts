import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'error',
  format: format.json(),
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.align(),
        format.printf(
          info => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      )
    })
  ]
});

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.message : exception;

    logger.error(
      typeof message === 'string' ? message : JSON.stringify(message)
    );
    console.log(message);
    response.status(code).json({
      code,
      message
    });
  }
}
