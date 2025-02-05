import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from '../entity/reservation.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { TripEntity } from '../../trip/entity/trip.entity';
import { ReservationDto } from '../dto/reservation.dto';
import { ReservationStatusEntity } from '../entity/reservation_status.entity';
import { StripeService } from '../../stripe/service/stripe.service';
import { NotificationService } from '../../notification/service/notification.service'; 

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
    private readonly reservationStatusRepository: Repository<ReservationStatusEntity>,
    private readonly paymentService: StripeService,
    private readonly notificationService: NotificationService
  ) {}

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
      console.log("Passenger ID received:", reservationData.passengerId);

      if (! reservationData.passengerId) {
        throw new HttpException('Passenger not found', HttpStatus.BAD_REQUEST);
      }

      const trip = await this.tripRepository
        .createQueryBuilder('trip')
        .innerJoinAndSelect('trip.departureCity', 'departureCity')
        .innerJoinAndSelect('trip.destinationCity', 'destinationCity')
        .select([
          'trip.id',
          'trip.availableSeats',
          'trip.pricePerSeat',
          'trip.departureDateTime',
          'departureCity.name',
          'destinationCity.name',
        ])
        .where('trip.id = :id', { id: reservationData.tripId })
        .getOne();

      if (!trip) {
        throw new HttpException('Trip not found', HttpStatus.NOT_FOUND);
      }

      if (trip.availableSeats === 0) {
        throw new HttpException('No available seats', HttpStatus.BAD_REQUEST);
      }

      if (reservationData.seatsReserved > trip.availableSeats) {
        throw new HttpException('Not enough available seats', HttpStatus.BAD_REQUEST);
      }

      const reservStatus = await this.reservationStatusRepository.findOneBy({
        id: reservationData.reservationStatus,
      });
      if (!reservStatus) {
        throw new HttpException('Invalid reservation status', HttpStatus.BAD_REQUEST);
      }

      const paymentRequestBody = {
        products: [
          {
            title: `Trip from ${trip.departureCity.name} to ${trip.destinationCity.name}`,
            price: trip.pricePerSeat,
            quantity: reservationData.seatsReserved,
            date: trip.departureDateTime,
          },
        ],
        currency: 'eur',
        customer: {
          name: client.username,
          email: client.email,
        },
      };

      const paymentResult = await this.paymentService.createPayment(paymentRequestBody);

      const reservation = this.reservationRepository.create({
        reservationStatus: reservStatus,
        passengerId: client,
        tripId: trip,
        seatsReserved: reservationData.seatsReserved,
        reservationTime: reservationData.reservationTime,
        paymentIntentId: paymentResult.paymentIntent.id,
      });

      await this.reservationRepository.save(reservation);

      trip.availableSeats -= reservationData.seatsReserved;
      await this.tripRepository.save(trip);

      await this.notificationService.notifyTripOwner(reservation)

      return {
        status: HttpStatus.CREATED,
        message: 'Reservation successful and payment processed',
        reservation,
        clientSecret: {
          client_secret: paymentResult.clientSecret,
        },
      };
    } catch (error) {
      console.error('Error while creating reservation:', error);

      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
