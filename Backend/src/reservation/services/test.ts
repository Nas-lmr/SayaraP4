// // import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { ReservationEntity } from "../entity/reservation.entity";
// import { UserEntity } from "../../user/entity/user.entity";
// import { TripEntity } from "../../trip/entity/trip.entity";
// import { ReservationDto } from "../dto/reservation.dto";
// import { ReservationStatusEntity } from "../entity/reservation_status.entity";
// import { StripeService } from "../../stripe/service/stripe.service";
// import { Injectable } from "@nestjs/common";

// @Injectable()
// export class ReservationService {
//   constructor(
//     @InjectRepository(ReservationEntity)
//     private readonly reservationRepository: Repository<ReservationEntity>,
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//     @InjectRepository(TripEntity)
//     private readonly tripRepository: Repository<TripEntity>,
//     @InjectRepository(ReservationStatusEntity)
//     private readonly reservationStsRepository: Repository<ReservationStatusEntity>,
//     private readonly paymentService: StripeService
//   ) {}

//   async create(
//     reservationData: ReservationDto
//   ): Promise<{
//     status: number;
//     message: string;
//     reservation?: ReservationEntity;
//     clientSecret?: any;
//   }> {
//     try {
//       const client = await this.userRepository.findOneBy({
//         id: reservationData.passengerId,
//       });
//       if (!client) throw new Error("No passenger found");

//       const trip = await this.tripRepository
//       .createQueryBuilder("trip")
//       .innerJoinAndSelect("trip.departureCity", "departureCity")
//       .innerJoinAndSelect("trip.destinationCity", "destinationCity")
//       .select([
//         "trip.id",
//         "trip.availableSeats",
//         "trip.pricePerSeat",
//         "trip.departureDateTime",
//         "departureCity.name",
//         "destinationCity.name",
//       ])
//       .where("trip.id = :id", { id: reservationData.tripId })
//       .getOne();

//     if (!trip) {
//       return { status: 400, message: "There is no tripId" };
//     }

//       // Step 2: Check available seats
//       if (trip.availableSeats === 0)
//         throw new Error("No available seats for this trip");

//       if (reservationData.seatsReserved > trip.availableSeats)
//         throw new Error("Not enough available seats");

//       const reservStatus = await this.reservationStsRepository.findOneBy({
//         id: reservationData.reservationStatus,
//       });
//       if (!reservStatus) throw new Error("No reservation status found");

//       // Step 3: Prepare payment request data
//       const paymentRequestBody = {
//         products: [
//           {
//             title: `Trip from ${trip.departureCity.name} to ${trip.destinationCity.name}`,
//             price: trip.pricePerSeat,
//             quantity: reservationData.seatsReserved,
//             date: trip.departureDateTime,
//           },
//         ],
//         currency: "eur",
//         customer: {
//           name: client.username,
//           email: client.email,
//         },
//       };

//       // Step 4: Create the payment and get the client_secret
//       const paymentResult =
//         await this.paymentService.createPayment(paymentRequestBody);

//       // Step 5: Confirm the payment immediately (you may want to integrate with your frontend to wait for user payment)
//       const paymentIntent = await this.paymentService.confirmPayment(
//         paymentResult.clientSecret
//       );

//       // Step 6: Check if payment succeeded
//       if (paymentIntent.status !== "succeeded") {
//         throw new Error("Payment confirmation failed");
//       }

//       // Step 7: Save reservation in the database
//       const reservation = this.reservationRepository.create({
//         passengerId: { id: reservationData.passengerId },
//         tripId: { id: reservationData.tripId },
//         seatsReserved: reservationData.seatsReserved,
//         reservationTime: reservationData.reservationTime,
//         paymentIntentId: paymentIntent.id,
//         reservationStatus: { id: reservationData.reservationStatus },
//       });

//       await this.reservationRepository.save(reservation);

//       // Step 8: Update available seats
//       trip.availableSeats -= reservationData.seatsReserved;
//       await this.tripRepository.save(trip);

//       return {
//         status: 201,
//         message: "Your reservation is complete and payment has been processed.",
//         reservation,
//         clientSecret: paymentResult.clientSecret, // return client secret for future reference if needed
//       };
//     } catch (error) {
//       console.error(error);
//       throw new Error(
//         "An error occurred while creating the reservation: " + error.message
//       );
//     }
//   }
// }
