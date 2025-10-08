import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '@app/auth/services/auth.service';
import { LoginDto } from '@app/auth/dto/login.dto';
import { AuthResponse } from '@app/shared/interfaces/base-response';
import { RegisterDto } from '@app/auth/dto/register.dto';
import { Response } from 'express';
import { Cookies } from '@app/shared/decorators/cookie.decorator';
@Controller('auth')
export class AuthController {
  cookie: 'refreshToken';
  httpOnly: true;
  secure: boolean;
  sameSite: 'none' | 'lax' | 'strict';
  constructor(private readonly authService: AuthService) {
    this.cookie = 'refreshToken';
    this.httpOnly = true;
    this.secure = process.env.NODE_ENV !== 'development';
    this.sameSite = process.env.NODE_ENV !== 'development' ? 'none' : 'lax';
  }

  @Post('register')
  async register(@Body() createUserDto: RegisterDto): Promise<AuthResponse> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const authResponse = await this.authService.login(loginDto);
    res.cookie(this.cookie, authResponse.refreshToken, {
      httpOnly: this.httpOnly,
      secure: this.secure,
      sameSite: this.sameSite,
    });
    res.json(authResponse);
  }

  @Post('refresh')
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
  ): Promise<AuthResponse> {
    return await this.authService.refresh(refreshToken);
  }

  @Post('logout')
  async logout(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ): Promise<void> {
    const logout = await this.authService.logout(refreshToken);
    res.clearCookie(this.cookie, {
      httpOnly: this.httpOnly,
      secure: this.secure,
    });
    res.json(logout);
  }
}
