import {Inject} from "@nestjs/common";
import {DataInsertedMicroService} from "./services/microServices/DataInsertedMicroService";
import {QueryWebSocketMicroService} from "./services/microServices/QueryWebSocketMicroService.service";
import {rowDataRoomToArray} from "./utils/websocket.util";
import {JwtService} from "@nestjs/jwt";

export class AbstractWebSocketService {
  protected _rooms: any = [];
  protected copyRoom = [];

  constructor(
    @Inject() protected readonly dataInsertedMicroService: DataInsertedMicroService,
    @Inject() protected readonly jwtService: JwtService,
    @Inject() protected readonly queryWebSocketMicroService: QueryWebSocketMicroService
  ) {}

  protected async getRoomReservation() {
    return rowDataRoomToArray(await this.queryWebSocketMicroService.queryRoom());
  }

  protected roomLengthSameAsZero() {
    return this._rooms.length === 0;
  }

  protected async initRooms() {
    const reservations: any = await this.getRoomReservation();
    for (const reservation of reservations) {
      if(this.roomLengthSameAsZero()) {
        await this.dataInsertedMicroService.firstInsert({reservations}, this._rooms, this.copyRoom);
      } else {
        const room = this._rooms.find(roomObj => roomObj.name === this.dataInsertedMicroService.constructObj(reservation).name);
        if(room === undefined)
          this._rooms.push(this.dataInsertedMicroService.constructObj(reservation));
      }
    }
  }
}