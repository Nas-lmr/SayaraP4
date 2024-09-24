import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() reservationDto: ReservationDto) {
    try {
      const test = await this.reservationService.create(reservationDto);
      console.log(test, "DANS BACKEND");
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
