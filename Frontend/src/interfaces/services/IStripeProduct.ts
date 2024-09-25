export interface IStripeProduct {
  passengerId: string | null;
  tripId: string;
  seatsReserved: number;
  paymentMethodId: string | null;
}
