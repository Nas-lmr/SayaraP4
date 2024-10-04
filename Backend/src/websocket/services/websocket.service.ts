import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReservationEntity} from "../../reservation/entity/reservation.entity";
import {Repository} from "typeorm";

@Injectable()
export class WebsocketService {

  constructor(@InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>) {}

  async getRoomsData(userId: number|undefined = undefined) {
    return !userId ?
      this.reservationRepository.createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.tripId', 'trips')
        .leftJoinAndSelect('reservation.passengerId', 'passenger')
        .leftJoinAndSelect('trips.owner', 'owner')
        // .where('reservation.seatsReserved <= trips.availableSeats')
        .getMany() :
      this.reservationRepository.createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.tripId', 'trips')
        .leftJoinAndSelect('reservation.passengerId', 'passenger')
        .leftJoinAndSelect('trips.owner', 'owner')
        .where('reservation.seatsReserved < trips.availableSeats')
        .andWhere('owner.id = :userId', {userId})
        .orWhere('passenger.id = :userId', {userId})
        .getMany();
  }
}