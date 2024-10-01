import {Injectable} from '@nestjs/common';
import {AbstractWebSocketService} from "../abstract-websocket.service";

@Injectable()
export class WebsocketService extends AbstractWebSocketService {


  addMessage(roomId: string, objMe: any) {
    const room = this.rooms.find(room => room.roomId === roomId);
    if (room) {
      room.messages.push({senders: objMe.senders, message: objMe.message});
    }
  }

  getRoomByUserId(userId: number) {
    this.initRooms().then();
    return this._rooms.filter((room: any) => room.users.includes(userId));
  }

  get rooms(): any[] {
    this.initRooms().then();
    return this._rooms;
  }

  async findUser(data: {token: string}) {
    return this.jwtService.verify(data.token);
  }

  async getRoom(roomId: number) {
    return this._rooms.find((room: any) => room.roomId === roomId);
  }

  async deleteRoom(id: number) {
    let beforeLength = this._rooms.length;
    this._rooms = this._rooms.filter((room: any) => room.roomId !== id);
    return this._rooms.length < beforeLength;
  }
}