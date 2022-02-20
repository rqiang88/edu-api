import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'error',
  format: format.json(),
  transports: [
    new transports.File({
      filename: 'logs/output.log',
      level: 'info',
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

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    logger.info(JSON.stringify(request.body));
    return next.handle();
  }
}
