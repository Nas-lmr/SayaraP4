import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[TypeOrmModule.forFeature([UserEntity])],
  exports:[UserService, TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
