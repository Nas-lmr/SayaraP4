import { IValidateTrajet } from "../components/IValidateTrajet";

export interface IPostTrajet {
  availableSeats: number;
  pricePerSeat: number;
  departureTime: string;
  departureDate: string;
  ownerId: string;
  departure_city_id: number;
  destination_city_id: number;
}

export interface IValidationTrajet extends IValidateTrajet {
  trajetData: IPostTrajet;
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}
