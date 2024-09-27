import {Module} from '@nestjs/common';
import {MessageGateway} from './gateway/message.gateway';
import {WebsocketController} from './controllers/websocket.controller';
import {WebsocketService} from './services/websocket.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TripEntity} from "../trip/entity/trip.entity";
import {JwtModule} from "@nestjs/jwt";
import {UserEntity} from "../user/entity/user.entity";
import {RedisService} from "./services/redis.service";
import {ReservationEntity} from "../reservation/entity/reservation.entity";
import {DataInsertedMicroService} from "./services/microServices/DataInsertedMicroService";
import {QueryWebSocketMicroService} from "./services/microServices/QueryWebSocketMicroService.service";
import {AbstractWebSocketService} from "./abstract-websocket.service";
import {WebsocketOwnerController} from "./controllers/websocket-owner.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationEntity,
      TripEntity,
      UserEntity
    ]),
    JwtModule.register({
    secret: 'your-secret-key', // Vous devez remplacer par votre clé secrète
    signOptions: { expiresIn: '45h' },
  })],
  controllers: [WebsocketController, WebsocketOwnerController],
  providers: [
    MessageGateway,
    AbstractWebSocketService,
    DataInsertedMicroService,
    QueryWebSocketMicroService,
    WebsocketService,
    RedisService,
  ]
})
export class WebsocketModule {}
