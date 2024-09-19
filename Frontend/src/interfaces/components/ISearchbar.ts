export interface ISearchbar {
  departureCity: string;
  setDepartureCity: (value: string) => void;
  arrivalCity: string;
  setArrivalCity: (value: string) => void;
  travelDate: Date | null;
  setTravelDate: (value: Date | null) => void;
  passengers: number;
  setPassengers: (value: number) => void;
  onSearch: () => void;
  onClose: () => void;
}
