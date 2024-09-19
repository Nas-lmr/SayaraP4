import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationEntity } from "../entity/reservation.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { TripEntity } from "src/trip/entity/trip.entity";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationStatusEntity } from "../entity/reservation_status.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    @InjectRepository(ReservationStatusEntity)
    private readonly reservationStsRepository:Repository<ReservationStatusEntity>
  ) {}

  async create(reservationData: ReservationDto):Promise<{status:number;message:string}>{

    try{
        const client = await this.userRepository.findOneBy({id:reservationData.passengerId})
        if(!client){
            return{status:400,message:"there no passengerId"}
        }
        const trip = await this.tripRepository.findOneBy({id:reservationData.tripId})
        if(!trip){
            return {status:400, message: "there no tripId"}
        }

        const reservStatus = await this.reservationStsRepository.findOneBy({id:reservationData.reservationStatus})
        if(!reservStatus){
            return {status:400, message: "there no reservation-statusId"}

        }
        const reservation = this.reservationRepository.create({
            reservationStatus:reservStatus,
            passengerId:client,
            tripId:trip,
            seatsReserved:reservationData.seatsReserved,
            reservationTime:reservationData.reservationTime


        });
        await this.reservationRepository.save(reservation)
        return{status:201,message:'your reservation is done'}
    }catch(error){
        console.error(error)
        return{
            status:500,
            message:"an error while making a reservation"
        }
    }
  };
}
