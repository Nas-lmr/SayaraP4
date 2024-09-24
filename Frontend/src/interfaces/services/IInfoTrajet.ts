export interface IInfoTrajet {
  id: string | null;
}

export interface IInfoTrajetId {
  departureCity: {
    name: string;
  };
  destinationCity: {
    name: string;
  };
  pricePerSeat: number;
  distance: number;
  duration: number;
  departureDateTime: string;
  availableSeats: number;
}
