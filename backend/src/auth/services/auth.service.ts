import { LoginDto } from '@app/auth/dto/login.dto';
import { RegisterDto } from '@app/auth/dto/register.dto';
import { RefreshToken } from '@app/auth/schemas/refresh-tokens.schema';
import { UserDto } from '@app/shared/dto/user.dto';
import {
  AuthResponse,
  BaseResponse,
} from '@app/shared/interfaces/base-response';
import { UsersService } from '@app/users/services/users.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}
  async register(createUserDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }
    const hashedPassword = await hash(createUserDto.password, 10);
    await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return {
      data: {},
      message: 'Usuario creado exitosamente',
      status: 201,
    };
  }

  async login(loginData: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginData;
    const { data: user } = await this.usersService.findByEmail(email, {
      password: true,
    });
    if (!user.password) {
      console.log(user.password, 'password');
      throw new InternalServerErrorException(
        'Error desconocido al obtener la contrasña',
      );
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const refreshToken = await this.generateRefreshToken(user);
    const accessToken = this.generateAccessToken(user);
    return {
      data: { accessToken },
      message: 'Login exitoso',
      status: 200,
      refreshToken: refreshToken,
    };
  }
  async refresh(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw new UnauthorizedException('No se proporcionó refresh token');
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const { data: user } = await this.usersService.findById(payload.sub);

    const accessToken = this.generateAccessToken(user);

    return {
      data: { accessToken },
      message: 'Token refrescado exitosamente',
      status: 200,
    };
  }

  async logout(
    refreshToken: string,
  ): Promise<BaseResponse<{ deleted: boolean }>> {
    const deleteRefreshToken = await this.refreshTokenModel
      .findOne()
      .where({
        refreshToken,
      })
      .updateOne({
        deletedAt: new Date(),
      });

    if (!deleteRefreshToken) {
      throw new NotFoundException('No se encontro la sesion');
    }

    return {
      message: 'Adios',
      status: 200,
      data: {
        deleted: true,
      },
    };
  }

  generateAccessToken(user: UserDto) {
    const payload = {
      sub: user._id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '5m',
    });
  }

  async generateRefreshToken(user: UserDto) {
    const payload = {
      sub: user._id,
      jti: randomUUID(),
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    await this.refreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
    });
    return refreshToken;
  }
}
