import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from '@app/tasks/services/tasks.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get(':columnId')
  async getByColumn(
    @Param('columnId', ParseObjectIdPipe) columnId: Types.ObjectId,
  ) {
    return this.tasksService.findByColumn(columnId);
  }

  @Get()
  async getAll() {
    return this.tasksService.findAll();
  }
}
