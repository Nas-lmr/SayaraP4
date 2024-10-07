import { IInfoTrajetId } from "./IInfoTrajet";

export interface IStripeProduct {
  onclick: () => void;
  seatsReserved: number;
  setSeatsReserved: (seats: number) => void;
  tripId: string;
  trajet: IInfoTrajetId | null;
}
