import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Query = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { body } = ctx.switchToHttp().getRequest();
    Reflect.defineProperty(body, 'limit', {
      value: Reflect.has(body, 'limit') ? +body.limit : _data ? 10000 : 20
    });

    Reflect.defineProperty(body, 'page', {
      value: Reflect.has(body, 'page') ? +body.page : 1
    });

    Object.assign(body, { take: body.limit });
    const skip = (body.page - 1) * body.limit;
    Reflect.defineProperty(body, 'skip', { value: skip });

    return body;
  }
);
