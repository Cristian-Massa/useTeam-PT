import { Module } from '@nestjs/common';
import { TasksModule } from '@app/tasks/tasks.module';
import { ColumnsModule } from '@app/columns/columns.module';
import { RoomsModule } from '@app/rooms/rooms.module';
import { KanbanModule } from '@app/kanban/kanban.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
