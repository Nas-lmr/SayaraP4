import {Controller, Delete, Get, Inject, Param} from '@nestjs/common';
import {WebsocketService} from "./websocket.service";
import {MessageGateway} from "./message.gateway";
import {RedisService} from "./redis.service";

@Controller('rooms')
export class WebsocketController {
  constructor(
    @Inject() private readonly websocketService: WebsocketService,
    @Inject() private readonly messageGateway: MessageGateway,
    @Inject() private readonly redisService: RedisService
  ) {}

  @Get()
  public getAllRooms(): { data: any[]; message: string } {
    return {
      message: 'All rooms',
      data: this.websocketService.rooms,
    };
  }
  @Get(':id')
  public getOneRooms(@Param('id') id: number): {data: any; message: string;} {
    return {
      message: 'All rooms',
      data: this.websocketService.getRoom(id),
    };
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    //TODO verify ID
    const roomId = parseInt(id);
    await this.websocketService.deleteRoom(roomId);
    this.messageGateway.server.emit('room', {
      action: 'delete',
      roomId: roomId,
    });
    await this.redisService.client.del(`room:${roomId}`);
    return {
      message: `Room ${roomId} deleted`,
    };
  }

}
