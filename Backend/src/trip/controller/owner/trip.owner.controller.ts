import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { TripOwnerService } from "src/trip/service/owner/trip.owner.service";

@Controller("ownerTrip")
export class TripOwnerController {
  constructor(private readonly ownerTrips: TripOwnerService) {}

  @Get("/:ownerId/:tripId")
  async getOwnerTrips(
    @Param("ownerId") ownerId: number,
    @Param("tripId") tripId: number
  ) {
    try {
      const data = await this.ownerTrips.getOwnerReservationsTrips(
        ownerId,
        tripId
      );

      if (data.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: "No reservations done for this ",
        };
      }

      return {
        statusCode: HttpStatus.OK,
        success: true,
        data,
        message: "All reservations done for this owner",
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: "Failed to fetch reservations done for this owner ",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("/owner/:id")
  async getTripsByOwnerId(@Param("id") id: number) {
    try {
      const data = await this.ownerTrips.getTripsByOwnerId(id);

      if (data.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: "No trips found for this owner",
        };
      }

      return {
        statusCode: HttpStatus.OK,
        success: true,
        data,
        message: "All trips that this owner has created",
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: "Failed to fetch owner trips",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
