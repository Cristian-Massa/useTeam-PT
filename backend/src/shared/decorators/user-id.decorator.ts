import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @UserId() -> Devuelve id del usuario
 */
export const UserId = createParamDecorator(
  (cookieName: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['userId'] ?? null;
  },
);
