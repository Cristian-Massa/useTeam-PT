import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { TasksService } from '@app/tasks/services/tasks.service';
import { CreateTaskDto } from '@app/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '@app/tasks/dto/update-task.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TasksGateway {
  constructor(private readonly tasksService: TasksService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create-task')
  async create(
    @MessageBody()
    { data, roomName }: { data: CreateTaskDto; roomName: string },
  ) {
    const task = await this.tasksService.create(data);

    this.server.to(roomName).emit('revalidate-tasks', task);
  }

  @SubscribeMessage('change-column-task')
  async changeTaskColumn(
    @MessageBody('')
    {
      data,
      roomName,
    }: {
      data: { taskId: string; overColumnId: string };
      roomName: string;
    },
  ) {
    const task = await this.tasksService.changeTaskColumn(data);
    this.server.to(roomName).emit('revalidate-tasks', task);
  }

  // @SubscribeMessage('update-task')
  // update(@MessageBody() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  // }

  // @SubscribeMessage('remove-task')
  // remove(@MessageBody() id: number) {
  //   return this.tasksService.remove(id);
  // }
}
