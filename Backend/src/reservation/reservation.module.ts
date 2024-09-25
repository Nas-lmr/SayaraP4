import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservationService } from "./services/reservation.service";
import { ReservationController } from "./controller/reservation.controller";
import { TripEntity } from "../trip/entity/trip.entity";
import { UserEntity } from "../user/entity/user.entity";
import { ReservationStatusEntity } from "./entity/reservation_status.entity";
import { ReservationEntity } from "./entity/reservation.entity";
import { StripeService } from "src/stripe/service/stripe.service";

@Module({
  providers: [ReservationService,StripeService],
  controllers: [ReservationController],
  imports: [
    TypeOrmModule.forFeature([
      ReservationEntity,
      TripEntity,
      UserEntity,
      ReservationStatusEntity,
    ]),
  ],
})
export class ReservationModule {}
