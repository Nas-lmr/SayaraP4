import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationEntity } from "src/reservation/entity/reservation.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../../../user/entity/user.entity";
import { TripEntity } from "../../entity/trip.entity";

@Injectable()
export class TripOwnerService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getOwnerReservationsTrips(
    userId: number,
    tripId: number
  ): Promise<any[]> {
    try {
      const ownerTrips = await this.reservationRepository
        .createQueryBuilder("reservation")
        .leftJoinAndSelect("reservation.tripId", "trip")
        .leftJoinAndSelect("trip.departureCity", "departureCity")
        .leftJoinAndSelect("trip.destinationCity", "destinationCity")
        .leftJoinAndSelect("trip.owner", "owner")
        .leftJoinAndSelect("reservation.passengerId", "passenger")
        .where("trip.owner = :userId", { userId })
        .andWhere("trip.id= :tripId", { tripId })
        .select([
          "reservation.id AS reservationId",
          "passenger.id AS passengerId",
          "passenger.username AS username",
          "passenger.email AS email",
          "trip.id AS tripId",
          "owner.id AS ownerId",
          "owner.username AS ownerName",
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

      if (ownerTrips.length === 0) {
        throw new NotFoundException({
          statusCode: 404,
          message: `No trips found for user with ID ${userId}`,
        });
      }

      const data = ownerTrips.map((reservation) => ({
        reservationId: reservation.reservationId,
        passenger: {
          id: reservation.passengerId,
          username: reservation.username,
          email: reservation.email,
        },
        trip: {
          id: reservation.tripId,
          ownerId: reservation.ownerId,
          ownerName: reservation.ownerName,
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
      console.log(data, "DANS SERVICE");

      return data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error fetching passenger trips:", error);

      // Differentiate between types of errors
      if (error instanceof NotFoundException) {
        throw error; // rethrow not found exception
      }

      // Handle other types of errors
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "An error occurred while fetching passenger trips",
      });
    }
  }

  async getTripsByOwnerId(userId: number): Promise<TripEntity[]> {
    return await this.tripRepository
      .createQueryBuilder("trip")
      .leftJoinAndSelect("trip.owner", "owner")
      .innerJoinAndSelect("trip.departureCity", "departureCity")
      .innerJoinAndSelect("trip.destinationCity", "destinationCity")
      .select([
        "trip.id",
        "owner.id", // Sélectionner l'ID du propriétaire
        "trip.availableSeats",
        "trip.pricePerSeat",
        "trip.departureDateTime",
        "departureCity.name",
        "destinationCity.name",
        "trip.distance",
        "trip.duration",
      ])
      .where("owner.id = :userId", { userId })
      .getMany(); // Utiliser getMany() pour obtenir plusieurs voyages
  }
}
