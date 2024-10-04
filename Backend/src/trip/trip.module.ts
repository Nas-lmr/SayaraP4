import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CityModule } from "src/city/city.module";
import { UserModule } from "src/user/user.module";

import { CityEntity } from "src/city/entity/city.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { TripEntity } from "./entity/trip.entity";
import { ReservationEntity } from "src/reservation/entity/reservation.entity";
import { TripController } from "./controller/trip.controller";
import { TripPassengerController } from "./controller/passenger/trip.passenger.controller";

import { TripService } from "./service/trip.service";
import { TripPassengerService } from "./service/passenger/trip.passenger.service";

@Module({
  providers: [TripService,TripPassengerService],
  controllers: [TripController,TripPassengerController],
  imports: [
    TypeOrmModule.forFeature([TripEntity, UserEntity, CityEntity,ReservationEntity]),
    CityModule,
    UserModule,
  ],
})
export class TripModule {}
