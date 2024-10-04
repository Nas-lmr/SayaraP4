import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReservationEntity} from "../../reservation/entity/reservation.entity";
import {Repository} from "typeorm";

@Injectable()
export class WebsocketService {

  constructor(@InjectRepository(ReservationEntity) private reservationRepository: Repository<ReservationEntity>) {}

  async getRoomsData(userId: number|undefined = undefined) {
    return !userId ?
      this.reservationRepository.createQueryBuilder('r')
        .leftJoinAndSelect('r.tripId', 'trips')
        .leftJoinAndSelect('r.passengerId', 'passenger')
        .leftJoinAndSelect('trips.owner', 'owner')
        .where('r.seatsReserved < trips.availableSeats')
        .getMany() :
      this.reservationRepository.createQueryBuilder('r')
        .leftJoinAndSelect('r.tripId', 'trips')
        .leftJoinAndSelect('r.passengerId', 'passenger')
        .leftJoinAndSelect('trips.owner', 'owner')
        .where('r.seatsReserved < trips.availableSeats')
        .andWhere('owner.id = :userId', {userId})
        .orWhere('passenger.id = :userId', {userId})
        .getMany();
  }
}