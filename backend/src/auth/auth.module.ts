import { AuthController } from '@app/auth/controllers/auth.controller';
import { AuthService } from '@app/auth/services/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '@app/auth/schemas/refresh-tokens.schema';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '5m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
