import {
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {JwtService} from "@nestjs/jwt";
import {RedisService} from "./redis.service";
import {Inject} from "@nestjs/common";

interface Payload {
  username: any;
  message: string;
  roomId: number;
}

@WebSocketGateway({
  cors: true,
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly messages = [];

  constructor(
    @Inject() private jwtService: JwtService,
    @Inject() private redisService: RedisService
  ){ }

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
    await this.redisService.client.lPush(
      `roomId: ${data.roomId}`,
      `${(await this.jwtService.verify(data.username)).username}: ${data.message}`
    );
    this.messages.push({username: (await this.jwtService.verify(data.username)).username, message: data.message, roomId: data.roomId});
    this.server.emit('message', this.messages);
  }
}
