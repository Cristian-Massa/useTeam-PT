import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '@app/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@app/tasks/dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from '@app/tasks/schemas/tasks.schema';
import mongoose, { Model, Types } from 'mongoose';
import { BaseResponse } from '@app/shared/interfaces/base-response';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private readonly tasksModel: Model<Tasks>,
  ) {}

  async findAll() {
    const findedTasks = await this.tasksModel.find().exec();

    return findedTasks;
  }

  async changeTaskColumn(data: { taskId: string; overColumnId: string }) {
    const { taskId, overColumnId } = data;
    const findedTask = await this.tasksModel.findByIdAndUpdate(taskId, {
      column: new mongoose.Types.ObjectId(overColumnId),
    });

    return findedTask;
  }

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = await this.tasksModel.create(createTaskDto);
    const task = await createdTask.save();

    return {
      task,
    };
  }

  async findByColumn(columnId: Types.ObjectId): Promise<BaseResponse<Tasks[]>> {
    const findedTasks = await this.tasksModel
      .find()
      .where({
        column: columnId,
      })
      .exec();
    return {
      data: findedTasks,
      status: 200,
    };
  }

  async deleteByColumn(id: string) {
    await this.tasksModel.deleteMany({ column: id });
  }
}
