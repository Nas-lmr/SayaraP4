import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CityModule } from "src/city/city.module";
import { UserModule } from "src/user/user.module";

import { CityEntity } from "src/city/entity/city.entity";
import { ReservationEntity } from "src/reservation/entity/reservation.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { TripPassengerController } from "./controller/passenger/trip.passenger.controller";
import { TripController } from "./controller/trip.controller";
import { TripEntity } from "./entity/trip.entity";

import { TripOwnerController } from "./controller/owner/trip.owner.controller";
import { TripOwnerService } from "./service/owner/trip.owner.service";
import { TripPassengerService } from "./service/passenger/trip.passenger.service";
import { TripService } from "./service/trip.service";

@Module({
  providers: [TripService, TripPassengerService, TripOwnerService],
  controllers: [TripController, TripPassengerController, TripOwnerController],
  imports: [
    TypeOrmModule.forFeature([
      TripEntity,
      UserEntity,
      CityEntity,
      ReservationEntity,
    ]),
    CityModule,
    UserModule,
  ],
})
export class TripModule {}
