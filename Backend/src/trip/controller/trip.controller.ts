import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpException,
  Query,
} from "@nestjs/common";
import { TripDto } from "../dto/trip.dto";
import { TripService } from "../service/trip.service";

@Controller("trip")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post("new-trip")
  async create(@Body() tripDto: TripDto) {
    try {
      const data = await this.tripService.create(tripDto);
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        data,
        message: "Trip created successfully",
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: error.response?.message || "Failed to create trip",
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  // all trips
  @Get()
  async getAll() {
    try {
      const data = await this.tripService.GetAll();
      return {
        statusCode: HttpStatus.OK,
        success: true,
        data,
        message: "you fetch is success",
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: " your fetch is not a success",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // get trips based on researche
  @Get("filtre")
  async FiltreTrip(
    @Query("dCity") dCity: string,
    @Query("aCity") aCity: string,
    @Query("dDate") dDate: string
  ) {
    try {
      const data = await this.tripService.GetFilteredTrip(dCity, aCity, dDate);

      if (data.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: "No trips found matching",
        };
      }

      return {
        statusCode: HttpStatus.OK,
        success: true,
        data,
        message: "Filtered trips fetched successfully",
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: error.response?.message || "Failed to fetch filtered trips",
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
