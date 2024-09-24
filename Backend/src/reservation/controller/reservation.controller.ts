import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(
    @Body() reservationDto: ReservationDto & { paymentMethodId: string }
  ) {
    const { paymentMethodId } = reservationDto;

    try {
      if (!paymentMethodId) {
        throw new HttpException(
          "Payment method ID is required",
          HttpStatus.BAD_REQUEST
        );
      }

      return await this.reservationService.create(
        reservationDto,
        paymentMethodId
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error.type === "StripeCardError") {
        throw new HttpException(
          "Your card was declined. Please try again.",
          HttpStatus.PAYMENT_REQUIRED
        );
      } else if (error.type === "StripeInvalidRequestError") {
        throw new HttpException(
          "Invalid payment method or parameters.",
          HttpStatus.BAD_REQUEST
        );
      } else if (error.type === "StripeAPIError") {
        throw new HttpException(
          "Stripe API is currently unavailable. Please try again later.",
          HttpStatus.SERVICE_UNAVAILABLE
        );
      } else {
        console.error("Unexpected error:", error);
        throw new HttpException(
          "An unexpected error occurred. Please try again.",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
