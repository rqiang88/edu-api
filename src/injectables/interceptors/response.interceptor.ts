import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /** 往body注入学校Id */
    const request = context.switchToHttp().getRequest();
    Object.defineProperty(request.body, 'schoolId', {
      value: request.user?.schoolId
    });
    return next.handle().pipe(
      map(item => {
        const data = Reflect.has(item, 'data') ? item : { data: item };

        if (!Reflect.has(data, 'code')) {
          Object.assign(data, { code: 200 });
        }

        if (!Reflect.has(data, 'message')) {
          Object.assign(data, { message: 'successed' });
        }

        return data;
      })
    );
  }
}
