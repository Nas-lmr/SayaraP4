import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class ReservationDto {
  @IsOptional()
  id?: number;

  @IsInt()
  @IsNotEmpty()
  reservationStatus: number;

  @IsInt()
  @IsNotEmpty({ message: "Passenger ID is required" })
  @IsPositive({ message: "Reservation status must be a positive number" })
  passengerId: number;

  @IsInt()
  @IsNotEmpty({ message: "Trip ID is required" })
  tripId: number;

  @IsInt()
  @IsNotEmpty({ message: "Seats reserved is required" })
  seatsReserved: number;

  @IsString()
  @IsOptional()
  paymentIntentId?: string;

  @IsOptional()
  reservationTime?: Date;
}
