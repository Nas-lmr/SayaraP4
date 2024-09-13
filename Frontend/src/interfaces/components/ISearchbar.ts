export interface ISearchbar {
  departureCity: string;
  setDepartureCity: (value: string) => void;
  arrivalCity: string;
  setArrivalCity: (value: string) => void;
  travelDate: string;
  setTravelDate: (value: string) => void;
  passengers: number;
  setPassengers: (value: number) => void;
  onSearch: () => void;
  onClose: () => void;
}
