import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from "../services/redis.service";
import { Inject } from "@nestjs/common";
import { WebsocketService } from "../services/websocket.service";
import {JwtService} from "@nestjs/jwt";

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
    @Inject() private roomsService: WebsocketService,
    @Inject() private jwtService: JwtService,
    @Inject() private redisService: RedisService
  ) { }

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
    const { roomId, token } = data;
    const decoded = this.jwtService.verify(token, { secret: 'your-secret-key' });
    const room = await this.roomsService.getRoom(parseInt(roomId));

    if (!room) {
      return client.emit('error', 'Room not found');
    }

    try {
      if (room.users.includes(decoded.id)) {
        client.join(room);
        return this.server.emit('joinRoom', room);
      } else {
        return client.emit('error', 'Unauthorized access');
      }
    } catch (error) {
      return client.emit('error', 'Invalid token');
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: Payload,
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, token, message } = data;

    try {
      const decoded = this.jwtService.verify(token, { secret: 'your-secret-key' });

      const room = await this.roomsService.getRoom(parseInt(roomId));

      if (!room) {
        return client.emit('error', 'Room not found');
      }

      if (room.users.includes(decoded.id)) {
        const newMessage = {
          senders: decoded.username,
          message: message,
        };
        // Sauvegarder le message dans Redis ou une autre base de données
        await this.redisService.client.lPush(
          `roomId:${roomId}`,
          JSON.stringify(newMessage)
        );

        // Add message to room
        this.roomsService.addMessage(roomId, newMessage);

        // Émettre le message à tous les membres de la salle
        this.server.to(room).emit('newMessage', {...room});
      } else {
        return client.emit('error', 'Unauthorized access');
      }
    } catch (error) {
      return client.emit('error', []);
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { roomId: string; token: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, token } = data;

    try {
      const decoded = this.jwtService.verify(token, { secret: 'your-secret-key' });
      const userId = decoded.id;

      const room = await this.roomsService.getRoom(parseInt(roomId));

      if (!room) {
        return client.emit('error', 'Room not found');
      }
      if (room.users.includes(userId)) {
        await this.redisService.client.lRange(`roomId:${room.roomId}`, 0, -1);
        client.emit('receiveMessages', room);
      } else {
        return client.emit('error', 'Unauthorized access');
      }
    } catch (error) {
      return client.emit('error', 'Invalid token');
    }
  }
}