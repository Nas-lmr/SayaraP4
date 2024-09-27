import {Controller, Get, HttpStatus, Inject, Param, Res} from "@nestjs/common";
import {WebsocketService} from "../services/websocket.service";
import {Response} from "express";

@Controller('owner')
export class WebsocketOwnerController {

  constructor(@Inject() private readonly websocketService: WebsocketService) {}

  @Get(':id')
  async getOneOwnerRooms(@Param('id') id: string, @Res() res: Response): Promise<Response<{status: number; data?: any; message: string;}>> {
    this.websocketService.rooms;
    let arrayOwner = this.websocketService.getRoomsByOwnerId(parseInt(id));
    if(arrayOwner.length > 0) {
      return res.status(HttpStatus.OK).json({
        status: res.statusCode,
        data: arrayOwner,
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: res.statusCode,
        message: `Owner with id ${id} doesn't have journey`,
      });
    }
  }
}