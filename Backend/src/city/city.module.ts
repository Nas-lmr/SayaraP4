import { Module } from '@nestjs/common';
import { CityController } from './controller/city.controller';
import { CityService } from './service/city.service';

@Module({
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
