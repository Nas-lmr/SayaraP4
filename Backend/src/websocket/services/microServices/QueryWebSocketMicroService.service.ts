import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ReservationEntity} from "../../../reservation/entity/reservation.entity";
import {Repository} from "typeorm";

@Injectable()
export class QueryWebSocketMicroService {
  constructor(@InjectRepository(ReservationEntity) private tripRepository: Repository<ReservationEntity>) {}


  async queryRoom() {
    return await this.tripRepository.createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.reservationStatus', 'statusReservation').leftJoinAndSelect('reservation.passengerId', 'passenger')
      .leftJoinAndSelect('reservation.tripId', 'trips').leftJoinAndSelect('trips.owner', 'users')
      .leftJoinAndSelect('trips.departureCity', 'firstCity').leftJoinAndSelect('trips.destinationCity', 'secondCity')
      .select(['reservation.id', 'users.username', 'users.id', 'firstCity.name', 'secondCity.name', 'statusReservation.name', 'passenger.id'])
      .distinctOn(['reservation.passenger_id'])
      .execute();
  }
}