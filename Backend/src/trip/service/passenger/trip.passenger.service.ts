import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TripEntity } from "../../entity/trip.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../../../user/entity/user.entity";
import { ReservationEntity } from "src/reservation/entity/reservation.entity";

@Injectable()
export class TripPassengerService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getPassengerTrips(userId: number): Promise<any[]> {
   

    try {
      const reservations = await this.reservationRepository
        .createQueryBuilder("reservation")
        .leftJoinAndSelect("reservation.tripId", "trip")
        .leftJoinAndSelect("trip.departureCity", "departureCity")
        .leftJoinAndSelect("trip.destinationCity", "destinationCity")
        .leftJoinAndSelect("reservation.passengerId", "passenger")
        .where("reservation.passengerId = :userId", { userId })
        .select([
          "reservation.id AS reservationId",
          "passenger.id AS passengerId",
          "passenger.username AS username",
          "passenger.email AS email",
          "trip.id AS tripId",
          "departureCity.name AS departureCity",
          "destinationCity.name AS destinationCity",
          "trip.pricePerSeat AS pricePerSeat",
          "trip.departureDateTime AS departureDateTime",
          "trip.distance AS distance",
          "trip.duration AS duration",
          "reservation.seatsReserved AS seatsReserved",
          "reservation.reservationTime AS reservationTime",
        ])
        .getRawMany();

      if (reservations.length === 0) {
        throw new NotFoundException({
          statusCode: 404,
          message: `No trips found for user with ID ${userId}`,
        });
      }

      const data = reservations.map((reservation) => ({
        reservationId: reservation.reservationId,
        passenger: {
          id: reservation.passengerId,
          username: reservation.username,
          email: reservation.email,
        },
        trip: {
          id: reservation.tripId,
          departureCity: reservation.departureCity,
          destinationCity: reservation.destinationCity,
          pricePerSeat: reservation.pricePerSeat,
          departureDateTime: reservation.departureDateTime,
          distance: reservation.distance,
          duration: reservation.duration,
        },
        seatsReserved: reservation.seatsReserved,
        reservationTime: reservation.reservationTime,
      }));

      return data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error fetching passenger trips:', error);

      // Differentiate between types of errors
      if (error instanceof NotFoundException) {
        throw error; // rethrow not found exception
      }

      // Handle other types of errors
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An error occurred while fetching passenger trips',
      });
    }
  }
}
