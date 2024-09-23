import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() reservationDto: ReservationDto) {
    try {
      return await this.reservationService.create(reservationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
