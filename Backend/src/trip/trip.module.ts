import { Module } from '@nestjs/common';
import { TripService } from './service/trip.service';
import { TripController } from './controller/trip.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TripEntity} from "./entity/trip.entity";

@Module({
  providers: [TripService],
  imports: [TypeOrmModule.forFeature([TripEntity])],
  exports: [TypeOrmModule.forFeature([TripEntity])],
  controllers: [TripController]
})
export class TripModule {}
