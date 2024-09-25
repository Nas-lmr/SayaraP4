import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Param,
} from "@nestjs/common";
import { TripPassengerService } from "src/trip/service/passenger/trip.passenger.service";

@Controller("passengerTrips")
export class TripPassengerController {
  constructor(private readonly PassengerTrips: TripPassengerService) {}

  @Get(":id")
  async getPassengerTrips(@Param("id") id: number) {
    try {
      const data = await this.PassengerTrips.getPassengerTrips(id);

      if (data.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: "No trips found for this passenger",
        };
      }

      return {
        statusCode: HttpStatus.OK,
        success: true,
        data,
        message: "All trips that this passenger has reserved",
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: "Failed to fetch passenger trips",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
