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
import {RedisService} from "./redis.service";
import {Inject} from "@nestjs/common";
import {WebsocketService} from "./websocket.service";
import {InjectRepository} from "@nestjs/typeorm";
import {TripEntity} from "../trip/entity/trip.entity";
import {Repository} from "typeorm";

interface Payload {
  roomId: string;
  token: string;
  message: string;
}

interface IGatewayUser {
  roomId: string;
  token: string;
}

@WebSocketGateway({
  cors: true,
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject() private jwtService: JwtService,
    @InjectRepository(TripEntity) private tripRepository: Repository<TripEntity>,
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
    @MessageBody() data: IGatewayUser,
    @ConnectedSocket() client: Socket
  ) {
    const {roomId, token} = data;
    const room: any = this.roomsService.getRoom(parseInt(roomId));
    if (!room) {
      return client.emit('error', 'Room not found');
    }
    try {
      const decoded = this.jwtService.verify(token);
      const id = decoded.id;
      if (id === room.owner_id || room.traveler_id === id) {
        client.join(roomId);
        client.emit('roomJoined', roomId);
      } else {
        client.emit('error', 'Unauthorized access');
      }
    } catch (e) {
      client.emit('error', 'Authentication error');
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: Payload
  ) {
    let decoded = this.jwtService.verify(data.token);
    await this.redisService.client.lPush(
      `roomId: ${data.roomId}`,
      `${decoded.username}: ${data.message}`
    );
    const { roomId } = data;
    console.log(roomId);
    const room = await this.roomsService.getRoom(parseInt(roomId));
    console.log(room);

    this.roomsService.addMessage(roomId, {senders: decoded.username, message: data.message});

    if (!room) {
      return this.server.emit('error', 'Room not found');
    }
    this.server.to(roomId).emit('message', room);
  }
}
