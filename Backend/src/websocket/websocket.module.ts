import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { WebsocketController } from './websocket.controller';
import { WebsocketService } from './websocket.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TripEntity} from "../trip/entity/trip.entity";
import {JwtModule} from "@nestjs/jwt";
import {UserEntity} from "../user/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity]), TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    secret: 'your-secret-key', // Vous devez remplacer par votre clé secrète
    signOptions: { expiresIn: '45h' },
  })],
  providers: [MessageGateway, WebsocketService],
  exports: [],
  controllers: [WebsocketController]
})
export class WebsocketModule {}
