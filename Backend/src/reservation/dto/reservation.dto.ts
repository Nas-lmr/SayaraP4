export class ReservationDto {
  id: number;
  reservationStatus: number;
  passengerId: number;
  tripId: number;
  seatsReserved: number;
  reservationTime: Date;
}
