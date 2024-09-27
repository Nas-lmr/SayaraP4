import {Injectable} from '@nestjs/common';
import {AbstractWebSocketService} from "../abstract-websocket.service";

@Injectable()
export class WebsocketService extends AbstractWebSocketService {


  addMessage(roomId: string, objMe: any) {
    const room = this.rooms.find(room => room.roomId === roomId);
    if (room) {
      room.messages.push({roomId: roomId, senders: objMe.senders, message:  objMe.message});
    }
  }

  get rooms(): any[] {
    this.initRooms().then();
    return this._rooms;
  }

  getRoomsByOwnerId(id: number) {
    this.initRooms().then();
    return this._rooms.filter(room => room.owner_id === id);
  }

  async getRoom(id: number) {
    this.initRooms().then();
    return await this._rooms.find(room => room.roomId === id);
  }

  async deleteRoom(id: number) {
    let beforeLength = this._rooms.length;
    this._rooms = this._rooms.filter((room) => room.id !== id);
    return this._rooms.length < beforeLength;
  }
}