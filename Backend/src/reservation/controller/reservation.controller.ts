import { Controller, Post, Body } from "@nestjs/common";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() reservationDto: ReservationDto) {
    return await this.reservationService.create(reservationDto);
  }
}
