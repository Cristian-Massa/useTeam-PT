import { Module } from '@nestjs/common';
import { TasksModule } from '@app/tasks/tasks.module';
import { ColumnsModule } from '@app/columns/columns.module';
import { RoomsModule } from '@app/rooms/rooms.module';
import { KanbanModule } from '@app/kanban/kanban.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '@app/shared/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '5m' },
      }),
    }),
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ColumnsModule,
    RoomsModule,
    KanbanModule,
    UsersModule,
    AuthModule,
  ],
  providers: [AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
