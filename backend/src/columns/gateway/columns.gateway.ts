import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ColumnsService } from '@app/columns/services/columns.service';
import { UpdateColumnDto } from '@app/columns/dto/update-column.dto';
import { Server, Socket } from 'socket.io';
import { CreateColumnDto } from '@app/columns/dto/create-column.dto';
import { SwapColumnsDto } from '@app/columns/dto/swap-column.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ColumnsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly columnsService: ColumnsService) {}

  @SubscribeMessage('join-kanban')
  handleJoinKanban(
    @MessageBody()
    { kanbanId }: { kanbanId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `kanban-room-${kanbanId}`;
    client.join(room);
  }

  @SubscribeMessage('createColumn')
  async create(
    @MessageBody()
    { data, roomName }: { data: CreateColumnDto; roomName: string },
  ) {
    const column = await this.columnsService.createColumn(data);
    this.server.to(roomName).emit('revalidate-columns', {
      message: 'Se ha creado una columna',
    });
    return column;
  }
  @SubscribeMessage('update-columns-position')
  async updatePosition(
    @MessageBody()
    { data, roomName }: { data: SwapColumnsDto; roomName: string },
  ) {
    const { firstColumnId, secondColumnId } = data;
    await this.columnsService.swapPosition(firstColumnId, secondColumnId);

    this.server.to(roomName).emit('revalidate-columns');
  }

  @SubscribeMessage('delete-column')
  async remove(
    @MessageBody() { id, roomName }: { id: string; roomName: string },
  ) {
    await this.columnsService.remove(id);

    this.server.to(roomName).emit('revalidate-columns');
  }
}
