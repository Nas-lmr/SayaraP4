export interface IDrawer {
  isOpen: boolean;
  onclose: () => void;
  departureCity: string;
  setDepartureCity: (value: string) => void;
  arrivalCity: string;
  setArrivalCity: (value: string) => void;
  travelDate: Date | null;
  setTravelDate: (date: Date | null) => void;
  passengers: number;
  setPassengers: (count: number) => void;
  onSearch: () => void;
}
