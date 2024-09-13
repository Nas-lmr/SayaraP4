import { Body, Controller, Post } from "@nestjs/common";
import { OwnerIdDTO } from "src/user/dto/user.dto";
import { TripDto } from "../dto/trip.dto";
import { TripService } from "../service/trip.service";

@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  async create(@Body() tripDto: TripDto, @Body("ownerId") ownerId: OwnerIdDTO) {
    await this.tripService.create(tripDto, ownerId);
    return { status: 200, message: "Trip created" };
  }
}
