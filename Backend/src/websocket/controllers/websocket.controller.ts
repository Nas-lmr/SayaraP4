import {Controller, Get, Inject, Res} from '@nestjs/common';
import {WebsocketService} from "../services/websocket.service";
import { Response } from 'express';

@Controller('rooms')
export class WebsocketController {
  constructor(@Inject() private readonly websocketService: WebsocketService) {}

  @Get()
  async getAllRooms(@Res() res: Response): Promise<Response<{status: number; data: any;}>> {
    return res.status(200).json({
      status: res.statusCode,
      data: [...await this.websocketService.getRoomsData()],
    });
  }
}
