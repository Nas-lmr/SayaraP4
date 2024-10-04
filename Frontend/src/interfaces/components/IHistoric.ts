export interface Passenger {
  id: number;
  username: string;
  email: string;
}

export interface Trip {
  id: number;
  ownerId: number;
  ownerName: string;
  departureCity: string;
  departureDateTime: string;
  destinationCity: string;
  distance: number;
  duration: number | string;
  pricePerSeat: number;
}

export interface Reservation {
  reservationId: number;
  passenger: Passenger;
  trip: Trip;
  seatsReserved: number;
  reservationTime: string;
}
