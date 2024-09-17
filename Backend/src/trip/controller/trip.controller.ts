import { Body, Controller, Post } from "@nestjs/common";
import { TripDto } from "../dto/trip.dto";
import { TripService } from "../service/trip.service";

@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post("new-trip")
  async create(@Body() tripDto: TripDto) {

    return await this.tripService.create(tripDto);
  }
}
