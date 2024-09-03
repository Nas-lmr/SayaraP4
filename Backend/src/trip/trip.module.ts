import { Module } from '@nestjs/common';
import { TripService } from './service/trip.service';
import { TripController } from './controller/trip.controller';

@Module({
  providers: [TripService],
  controllers: [TripController]
})
export class TripModule {}
