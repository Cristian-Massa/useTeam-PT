import { Server, Socket } from 'socket.io';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { WSBaseResponse } from '@app/shared/interfaces/base-response';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class KanbanGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-kanban')
  handleJoinKanban(
    @MessageBody()
    { kanbanId, username }: { kanbanId: string; username: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `kanban-room-${kanbanId}`;
    client.join(room);

    const roomNameToClient: WSBaseResponse<null> = {
      data: null,
      roomName: room,
    };
    client.emit('room-name', roomNameToClient);

    const newParticipantNotification: WSBaseResponse<null> = {
      data: null,
      message: `${username} se ha unido a la sala`,
    };

    client.to(room).emit('real-time-message', newParticipantNotification);

    return { status: 'ok' };
  }
}
