import { IValidateTrajet } from "../components/IValidateTrajet";

export interface IPostTrajet {
  villeDepart: string;
  villeArrive: string;
  distance: number;
  duration: number;
  date: string;
  time: string;
  price: number;
  passager: number;
}

export interface IValidationTrajet extends IValidateTrajet {
  trajetData: IPostTrajet;
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}
