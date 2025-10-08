import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @Cookies() -> devuelve todas las cookies
 * @Cookies('nombre') -> devuelve solo la cookie con ese nombre
 */
export const Cookies = createParamDecorator(
  (cookieName: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cookies = request.cookies || {};
    return cookieName ? cookies[cookieName] : cookies;
  },
);
