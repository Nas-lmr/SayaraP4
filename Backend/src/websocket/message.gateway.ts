import {
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {JwtService} from "@nestjs/jwt";

interface Payload {
  username: string;
  message: string;
  roomId: number;
}

@WebSocketGateway({
  cors: true,
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly messages = [];
  constructor(private jwtService: JwtService) {
  }

  @WebSocketServer()
  server: Server;
  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: Payload) {
    this.messages.push({username: (await this.jwtService.verify(data.username)).username, message: data.message, roomId: data.roomId});
    this.server.emit('message', this.messages);
  }
}
