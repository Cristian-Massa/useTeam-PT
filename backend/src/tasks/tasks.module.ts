import { Module } from '@nestjs/common';
import { TasksService } from '@app/tasks/services/tasks.service';
import { TasksGateway } from '@app/tasks/gateway/tasks.gateway';
import { TaksSchema, Tasks } from '@app/tasks/schemas/tasks.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from '@app/tasks/controllers/tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tasks.name, schema: TaksSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksGateway, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
