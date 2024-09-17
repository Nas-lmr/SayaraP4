import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityModule } from "src/city/city.module";
import { CityEntity } from "src/city/entity/city.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { UserModule } from "src/user/user.module";
import { TripController } from "./controller/trip.controller";
import { TripEntity } from "./entity/trip.entity";
import { TripService } from "./service/trip.service";

@Module({
  providers: [TripService],
  controllers: [TripController],
  imports: [
    TypeOrmModule.forFeature([TripEntity, UserEntity, CityEntity]),
    CityModule,
    UserModule,
  ],
})
export class TripModule {}
