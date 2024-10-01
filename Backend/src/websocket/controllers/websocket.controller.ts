import {Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Res} from '@nestjs/common';
import {WebsocketService} from "../services/websocket.service";
import {MessageGateway} from "../gateway/message.gateway";
import {RedisService} from "../services/redis.service";
import { Response } from 'express';

@Controller('rooms')
export class WebsocketController {
  constructor(
    @Inject() private readonly websocketService: WebsocketService,
    @Inject() private readonly messageGateway: MessageGateway,
    @Inject() private readonly redisService: RedisService
  ) {}

  @Get()
  getAllRooms(@Res() res: Response): Response<{status: number; data: any;}> {
    return res.status(200).json({
      status: res.statusCode,
      data: this.websocketService.rooms,
    });
  }
  @Get(':id')
  async getOneRooms(@Param('id') id: string, @Res() res: Response): Promise<Response<{status: number; data?: any; message: string;}>> {
    const room = await this.websocketService.getRoom(parseInt(id));
    if(room) {
      return res.status(HttpStatus.OK).json({status: res.statusCode, message: `OneRoom`, data: room})
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({status: res.statusCode, message: 'Room not found'});
    }
  }
  @Post('userId')
  async findUser(@Body() data: {token: string}) {
    return this.websocketService.findUser(data);
  }
  @Delete(':id')
  async deleteRoom(@Param('id') id: string, @Res() res: Response) {
    //TODO verify ID
    const roomId = parseInt(id);
    let deletedRoom = await this.websocketService.deleteRoom(roomId);
    this.messageGateway.server.emit('room', {
      action: 'delete',
      roomId: parseInt(id),
    });
    await this.redisService.client.del(`room:${parseInt(id)}`);
    if(deletedRoom) {
      return res.status(HttpStatus.NO_CONTENT).json({
        status: res.statusCode,
        message: `Room ${parseInt(id)} deleted`,
      });
    }
  }

}
