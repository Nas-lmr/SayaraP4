import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CityService } from '../service/city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async AddCity(
    @Body() city: any,
  ): Promise<{ status: number; message: string }> {
    return this.cityService.create(city);
  }

  @Get()
  async getAllcitys(): Promise<{
    name: string;
    address: string;
    coordinate: any;
  }> {
    return this.cityService.findAll();
  }

// get one city by the name using params query 
  @Get('one')
  async findOne(@Query('name') name: string) {
    const city = await this.cityService.findOne(name);
    if (!city) {
      return { message: `la ville avec ce nom ${name}  n'exist pas` };
    }
    return city;
  }
}
