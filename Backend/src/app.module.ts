import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig } from "./config/database.config";
import { UserModule } from "./user/user.module";
import { CityModule } from "./city/city.module";
import { TripModule } from "./trip/trip.module";
import { AuthModule } from "./auth/auth.module";
import { ReservationModule } from "./reservation/reservation.module";
import { StripeModule } from "./stripe/stripe.module";
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => databaseConfig,
    }),
    UserModule,
    CityModule,
    TripModule,
    AuthModule,
    ReservationModule,
    StripeModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
