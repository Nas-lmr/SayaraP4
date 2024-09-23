import { Product } from './produc';

export interface PaymentRequestBody {
  products: Product[];
  currency: string;
}
