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
import { Cookies } from '@app/shared/decorators/cookie.decorator';
import { UserId } from '@app/shared/decorators/user-id.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@UserId() userId: string) {
    return this.usersService.findById(userId);
  }
}
