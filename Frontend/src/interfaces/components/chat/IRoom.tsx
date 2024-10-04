export interface IRoom {
  "id": number;
  "seatsReserved": number;
  "reservationTime": string;
  "tripId": {
    "id": number;
    "availableSeats": number;
    "pricePerSeat": number;
    "departureDateTime": string;
    "distance": number;
    "duration": number;
    "owner": {
      "id": number;
      "username": string;
      "email": string;
      "password": string;
      "description": string;
    }
  },
  "passengerId": {
    "id": number,
    "username": string;
    "email": string;
    "password": string;
    "description": string;
  }
}

export interface IPropsRoom {
  selectedRoom: (id: number) => void;
  roomId: number | undefined;
}