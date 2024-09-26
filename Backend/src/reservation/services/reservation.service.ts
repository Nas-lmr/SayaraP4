import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/* -----------------------------------------------------------------*/
import { ReservationEntity } from "../entity/reservation.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { TripEntity } from "../../trip/entity/trip.entity";
import { ReservationDto } from "../dto/reservation.dto";
import { ReservationStatusEntity } from "../entity/reservation_status.entity";
import { StripeService } from "../../stripe/service/stripe.service";

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
  async create(reservationData: ReservationDto): Promise<{
    status: number;
    message: string;
    reservation?: ReservationEntity;
    clientSecret?: any;
  }> {
    try {
      const client = await this.userRepository.findOneBy({
        id: reservationData.passengerId,
      });
      if (!client) {
        return { status: 400, message: "There is no passengerId" };
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
        return { status: 400, message: "There is no tripId" };
      }
      // Check available seats

      if (trip.availableSeats == 0) {
        return { status: 400, message: "No available seats for this trip" };
      }
      if (reservationData.seatsReserved > trip.availableSeats) {
        return { status: 400, message: "Not enough available seats" };
      }

      const reservStatus = await this.reservationStsRepository.findOneBy({
        id: reservationData.reservationStatus,
      });
      if (!reservStatus) {
        return { status: 400, message: "There is no reservation-statusId" };
      }
      // Prepare payment request data
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

      // Create the payment
      const paymentResult =
        await this.paymentService.createPayment(paymentRequestBody);

      console.log("Client Secret:", paymentResult.clientSecret);

      // Create the reservation with the payment intent ID
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
        message: "Your reservation is done and payment is processed",
        reservation,
        clientSecret: {
          client_secret: paymentResult.clientSecret,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "An error occurred while making a reservation",
      };
    }
  }
}
