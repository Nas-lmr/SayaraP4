import { ProductDto } from "./stripe.product.dto";
import { CustomerDto } from "./stripe.customer.dto";

export class PaymentRequestBodyDto {
  products: ProductDto[];
  currency: string;
  customer: CustomerDto;
}
