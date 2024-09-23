import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TripEntity} from "../trip/entity/trip.entity";

@Injectable()
export class WebsocketService {
  private _rooms = [];
  private copyRoom = [];

  constructor(@InjectRepository(TripEntity) private tripRepository: Repository<TripEntity>) {}

  async initRooms() {
    const trips: any = Object.values(JSON.parse(JSON.stringify(await this.tripRepository.createQueryBuilder('trips')
      .leftJoinAndSelect('trips.owner', 'users')
      .leftJoinAndSelect('trips.departureCity', 'firstCity')
      .leftJoinAndSelect('trips.destinationCity', 'secondCity')
      .select(['users.username', 'users.id', 'firstCity.name', 'secondCity.name', 'trips.departureTime', 'trips.id', 'trips.departureTime'])
      .execute())));
    let obj: any;
    if(this._rooms.length === 0) {
      for (const trip of trips) {
        if(!this._rooms.includes({
          roomId: trip['trips_id'],
          owner_id: trip['users_id'],
          // fill in the traveler_id with a user ID
          traveler_id: null,
          name: trip['users_username'] + '-' + trip['firstCity_name'] + '_' +
            trip['secondCity_name'] + '/' + trip['departureTime'],
          messages: []
        })){
          obj = {
            roomId: trip['trips_id'],
            owner_id: trip['users_id'],
            // fill in the traveler_id with a user ID
            traveler_id: null,
            name: trip['users_username'] + '-' + trip['firstCity_name'] + '_' +
              trip['secondCity_name'] + '/' + trip['departureTime'],
            archived: false,
            messages: []
          };
          this._rooms.push(obj);
          this.copyRoom.push(obj.id);
          this._rooms = [...new Set(this._rooms)];
        }
      }
    } else {
      for (const trip of trips) {
        obj = {
          roomId: trip['trips_id'],
          owner_id: trip['users_id'],
          // fill in the traveler_id with a user ID
          traveler_id: null,
          name: trip['users_username'] + '-' + trip['firstCity_name'] + '_' +
            trip['secondCity_name'] + '/' + trip['departureTime'],
          archived: false,
          messages: []
        };
        if(!this.copyRoom.includes(obj.id)) {
          this._rooms.push(obj);
          return;
        }
      }
    }
  }

  get rooms(): any[] {
    this.initRooms().then();
    return this._rooms;
  }

  async getRoom(id: number) {
    return await this._rooms.find(room => room.roomId === id);
  }
  async deleteRoom(id: number) {
    this._rooms = this._rooms.filter((room) => room.id !== id);
  }
  addMessage(roomId: string, objMe: any) {
    const room = this.rooms.find(room => room.roomId === roomId);
    if (room) {
      room.messages.push({roomId: roomId, senders: objMe.senders, message:  objMe.message});
    }
  }
}