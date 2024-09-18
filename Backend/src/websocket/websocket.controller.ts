import {Controller, Delete, Get, Param} from '@nestjs/common';
import {WebsocketService} from "./websocket.service";
import {MessageGateway} from "./message.gateway";

@Controller('rooms')
export class WebsocketController {
  constructor(private readonly websocketService: WebsocketService, private readonly messageGateway: MessageGateway) {}

  @Get()
  public getAllRooms(): { data: any[]; message: string } {
    return {
      message: 'All rooms',
      data: this.websocketService.rooms,
    };
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    //TODO verify ID
    const roomId = parseInt(id);
    this.websocketService.delete(roomId);
    this.messageGateway.server.emit('room', {
      action: 'delete',
      roomId: roomId,
    });
    return {
      message: `Room ${roomId} deleted`,
    };
  }

}
