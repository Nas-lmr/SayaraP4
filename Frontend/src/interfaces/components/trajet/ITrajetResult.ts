export interface ITrajetResult {
  id: string;
  departureDateTime: string;
  departureTime: string;
  departureCity: { name: string };
  destinationCity: { name: string };
  pricePerSeat: number;
  distance: number;
  duration: number;
}
