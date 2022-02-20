import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentTeacher = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const {
      header: { user }
    } = ctx.switchToHttp().getRequest();
    return user;
  }
);
