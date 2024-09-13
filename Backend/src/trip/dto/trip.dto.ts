export class TripDto {
  id: number;
  departureCityId: number;
  destinationCityId: number;
  // meetingPoint: string;
  availableSeats: number;
  departureTime: Date;
  departureDate: Date;
  pricePerSeat: number;
}
