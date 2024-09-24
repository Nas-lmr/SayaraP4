import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/* -----------------------------------------------------------------*/
import { StripeService } from "../../stripe/service/stripe.service";
import { TripEntity } from "../../trip/entity/trip.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationEntity } from "../entity/reservation.entity";
import { ReservationStatusEntity } from "../entity/reservation_status.entity";

/* -----------------------------------------------------------------*/

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    @InjectRepository(ReservationStatusEntity)
    private readonly reservationStsRepository: Repository<ReservationStatusEntity>,
    private readonly paymentService: StripeService
  ) {}

  // make reservation

  async create(
    reservationData: ReservationDto,
    paymentMethodId: string
  ): Promise<{
    status: number;
    message: string;
    reservation?: ReservationEntity;
    clientSecret?: string;
  }> {
    try {
      const client = await this.userRepository.findOneBy({
        id: reservationData.passengerId,
      });
      if (!client) {
        throw new HttpException("Passenger not found.", HttpStatus.BAD_REQUEST);
      }

      const trip = await this.tripRepository
        .createQueryBuilder("trip")
        .innerJoinAndSelect("trip.departureCity", "departureCity")
        .innerJoinAndSelect("trip.destinationCity", "destinationCity")
        .select([
          "trip.id",
          "trip.availableSeats",
          "trip.pricePerSeat",
          "trip.departureDateTime",
          "departureCity.name",
          "destinationCity.name",
        ])
        .where("trip.id = :id", { id: reservationData.tripId })
        .getOne();

      if (!trip) {
        throw new HttpException("Trip not found.", HttpStatus.BAD_REQUEST);
      }

      // check the seats
      if (
        trip.availableSeats === 0 ||
        reservationData.seatsReserved > trip.availableSeats
      ) {
        throw new HttpException(
          "Not enough available seats.",
          HttpStatus.BAD_REQUEST
        );
      }

      // reservation status en attente by default
      const reservStatus = await this.reservationStsRepository.findOneBy({
        id: reservationData.reservationStatus,
      });
      if (!reservStatus) {
        throw new HttpException(
          "Reservation status not found.",
          HttpStatus.BAD_REQUEST
        );
      }

      // payment request data

      const paymentRequestBody = {
        products: [
          {
            title: `Trip from ${trip.departureCity.name} to ${trip.destinationCity.name}`,
            price: trip.pricePerSeat,
            quantity: reservationData.seatsReserved,
            date: trip.departureDateTime,
          },
        ],
        currency: "eur",
        customer: {
          name: client.username,
          email: client.email,
        },
      };

      // Create and confirm the payment the funtion in stripe service
      const paymentResult = await this.paymentService.createAndConfirmPayment(
        paymentRequestBody,
        paymentMethodId
      );

      // Create the reservation with the confirmed payment intent ID
      const reservation = this.reservationRepository.create({
        reservationStatus: reservStatus,
        passengerId: client,
        tripId: trip,
        seatsReserved: reservationData.seatsReserved,
        reservationTime: reservationData.reservationTime,
        paymentIntentId: paymentResult.paymentIntent.id,
      });

      await this.reservationRepository.save(reservation);

      // Update available seats in the trip
      trip.availableSeats -= reservationData.seatsReserved;
      await this.tripRepository.save(trip);

      return {
        status: 201,
        message: "Your reservation is done and payment is confirmed",
        clientSecret: paymentResult.ClientSecret,
      };
    } catch (error) {
      console.error("Error during reservation:", error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        "An error occurred while making a reservation and confirming payment. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
