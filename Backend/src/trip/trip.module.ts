import { CityModule } from "src/city/city.module";
import { CityEntity } from "src/city/entity/city.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { UserModule } from "src/user/user.module";
import { Module } from '@nestjs/common';
import { TripService } from './service/trip.service';
import { TripController } from './controller/trip.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TripEntity} from "./entity/trip.entity";

@Module({
  providers: [TripService],
  exports: [TypeOrmModule.forFeature([TripEntity])],
  controllers: [TripController],
  imports: [
    TypeOrmModule.forFeature([TripEntity, UserEntity, CityEntity]),
    CityModule,
    UserModule,
  ],
})
export class TripModule {}
