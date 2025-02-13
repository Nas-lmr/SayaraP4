import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './controller/notification.controller';
import { NotificationService } from './service/notification.service';
import { TripEntity } from 'src/trip/entity/trip.entity';
import { NotificationEntity } from './entity/notification.entity';
import { NotificationTypeEntity } from './entity/notificatioType.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ReservationStatusEntity } from 'src/reservation/entity/reservation_status.entity';
import { ReservationEntity } from 'src/reservation/entity/reservation.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SeedNotificationService } from './service/seed-notification.service';
@Module({
  controllers: [NotificationController],
  providers: [NotificationService,SeedNotificationService],
  imports:[
    TypeOrmModule.forFeature([
      TripEntity,
      NotificationEntity,
      NotificationTypeEntity,
      UserEntity,
      ReservationStatusEntity,
      ReservationEntity

    ]),
    EventEmitterModule.forRoot(),

  ]
})
export class NotificationModule {}
