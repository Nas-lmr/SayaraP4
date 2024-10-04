import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';

interface IPayload {
  message: {content: string; author: string};
  roomId: string;
}

@WebSocketGateway({
  cors: true
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  readonly rooms: any = [
    {
      roomId: 1,
      messages: []
    },
    {
      roomId: 2,
      messages: []
    },
    {
      roomId: 3,
      messages: []
    }
  ];
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() _client: Socket, @MessageBody() payload: IPayload) {
    const {roomId, message} = payload;
    console.log(`send message to ${roomId}`, message);
    return this.server.to(roomId).emit('newMessage', message);
  }
  @SubscribeMessage('joinRoom')
  handleConnect(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    if(payload.roomId) {
      client.join(payload.roomId);
      console.log(`${client.id} JOIN room ${payload.roomId}`);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleDisconnect(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    if(payload) {
      console.log(`${client.id} Leave room ${payload.roomId}`);
      client.leave(payload.roomId);
    }
  }
}
