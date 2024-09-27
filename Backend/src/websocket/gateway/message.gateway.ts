import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {JwtService} from "@nestjs/jwt";
import {RedisService} from "../services/redis.service";
import {Inject} from "@nestjs/common";
import {WebsocketService} from "../services/websocket.service";

interface Payload {
  roomId: string;
  token: string;
  message: string;
}

@WebSocketGateway({
  cors: true,
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject() private jwtService: JwtService,
    @Inject() private roomsService: WebsocketService,
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

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { roomId: string; token: string },
    @ConnectedSocket() client: Socket,
  ) {
    const {roomId, token} = data;
    this.roomsService.rooms;
    const room = await this.roomsService.getRoom(parseInt(roomId));

    if (!room) {
      return client.emit('error', 'Room not found');
    }
    const decoded = this.jwtService.verify(token, {secret: 'your-secret-key'});
      const id = decoded.id;
      if (id === room.owner_id || room.traveler_id === id) {
        client.join(roomId);
        return this.server.emit('joinRoom', room);
      }
  }
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: Payload
  ) {
    let decoded = this.jwtService.verify(data.token);
    await this.redisService.client.lPush(
      `roomId: ${data.roomId}`,
      `${decoded.username}: ${data.message}`
    );
    const { roomId } = data;
    this.roomsService.rooms;
    const room = await this.roomsService.getRoom(parseInt(roomId));

    this.roomsService.addMessage(roomId, {senders: decoded.username, message: data.message});

    if (!room) {
      return this.server.emit('error', 'Room not found');
    }
    this.server.to(roomId).emit('newMessage', room);
  }
}
