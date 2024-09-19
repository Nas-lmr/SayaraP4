import { Injectable } from '@nestjs/common';
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
      .select(['users.username', 'firstCity.name', 'secondCity.name', 'trips.departureTime', 'trips.id'])
      .execute())));
    let obj: any;
    if(this._rooms.length === 0) {
      for (const trip of trips) {
        if(!this._rooms.includes({
          id: trip['trips_id'],
          name: trip['users_username'] + '-' + trip['firstCity_name'] + '_' +
            trip['secondCity_name'] + '/' + trip['trips_departureTime'],
        })){
          obj = {
            id: trip['trips_id'],
            name: trip['users_username'] + '-' + trip['firstCity_name'] + '_' +
              trip['secondCity_name'] + '/' + trip['trips_departureTime'],
            archived: false
          };
          this._rooms.push(obj);
          this.copyRoom.push(obj.id);
          this._rooms = [...new Set(this._rooms)];
        }
      }
    } else {
      for (const trip of trips) {
        obj = {
          id: trip['trips_id'],
          name: trip['users_username'] + '-' + trip['firstCity_name'] + '_' +
            trip['secondCity_name'] + '/' + trip['trips_departureTime'],
          archived: false
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

  delete(id: number) {
    this._rooms = this._rooms.filter((room) => room.id !== id);
  }
}