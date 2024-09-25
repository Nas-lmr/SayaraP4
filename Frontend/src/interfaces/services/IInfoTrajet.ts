export interface IInfoTrajet {
  id: string | null;
}

export interface IInfoTrajetId {
  id: string | null;
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
