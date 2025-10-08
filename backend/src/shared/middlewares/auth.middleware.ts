import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token expired' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET') ?? '',
      });
      req['userId'] = payload.sub;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token de acceso expirado',
        cause: 'access_token_expired',
      });
    }
  }
}
