// Interface for the user object
interface user {
  id: number;
  username: string;
  email: string;
  password: string;
  description: string | null;
}

// Interface for the reservation object
interface Reservation {
  id: number;
  seatsReserved: number;
  paymentIntentId: string;
  reservationTime: string;
}

// Interface for the trip object
interface tripId {
  id: number;
  departureDateTime: string;
  departureCity: City;
  destinationCity: City;
}

interface City {
  id: number;
  name: string;
}

interface Type {
  name: string;
}

export interface Notification {
  id: number;
  content: string;
  seen: boolean;
  user: user;
  reservationId: Reservation;
  tripId: tripId;
  type: Type;
}
