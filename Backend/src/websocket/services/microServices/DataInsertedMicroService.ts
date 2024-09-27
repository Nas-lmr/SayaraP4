import {Injectable} from "@nestjs/common";

@Injectable()
export class DataInsertedMicroService {
  constructor() {}

  verifyRoomNotIncludedData(reservation: any, rooms: any[]) {
    return !rooms.includes({
      roomId: reservation['reservation_id'],
      owner_id: reservation['users_id'],
      // fill in the traveler_id with a user ID
      traveler_id: reservation['passenger_id'],
      name: reservation['users_username'] + '-' + reservation['firstCity_name'] + '_' +
        reservation['secondCity_name'],
      messages: []
    });
  }

  async firstInsert(datas: {reservations: any }, firstArray: any[], secondArray: any[]) {
    for (const reservation of datas.reservations) {
      // Création de la room que si le status de la réservation est confirmée pas avant
      if(this.verifyRoomNotIncludedData(reservation, firstArray)) this.firstPush(reservation, firstArray, secondArray);
    }
  }
  constructObj(reservation: any) {
    return {
      roomId: reservation['reservation_id'],
      owner_id: reservation['users_id'],
      // fill in the traveler_id with a user ID
      traveler_id: reservation['passenger_id'],
      name: reservation['users_username'] + '-' + reservation['firstCity_name'] + '_' +
        reservation['secondCity_name'],
      archived: false,
      messages: []
    };
  }

  firstPush(reservation: any, firstArray: any[], secondArray: any[]) {
    firstArray.push(this.constructObj(reservation));
    secondArray.push(this.constructObj(reservation).roomId);
  }

}