import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  HttpCode,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@app/users/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Req() req: Request) {
    const sessionId = req.cookies['session'];
    if (!sessionId) {
      return { message: 'No autenticado' };
    }

    const user = await this.usersService.findById(sessionId);
    if (!user) {
      return { message: 'Sesión inválida' };
    }
    return { user };
  }
}
