import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Paginate = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { body } = ctx.switchToHttp().getRequest();

    Reflect.has(body, 'limit')
      ? Reflect.defineProperty(body, 'limit', { value: +body.limit })
      : Reflect.defineProperty(body, 'limit', { value: 20 });

    Reflect.has(body, 'page')
      ? Reflect.defineProperty(body, 'page', { value: +body.page })
      : Reflect.defineProperty(body, 'page', { value: 1 });

    Object.assign(body, { take: body.limit });
    const skip = (body.page - 1) * body.limit;
    Reflect.defineProperty(body, 'skip', { value: skip });

    return body;
  }
);
