import { Module } from '@nestjs/common';
import { CityController } from './controller/city.controller';
import { CityService } from './service/city.service';
import { CityEntity } from './entity/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
