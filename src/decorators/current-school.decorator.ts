import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentSchool = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const {
      header: { school }
    } = ctx.switchToHttp().getRequest();
    return school;
  }
);
