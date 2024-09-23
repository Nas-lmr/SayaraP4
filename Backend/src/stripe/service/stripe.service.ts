import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PaymentRequestBody } from "../PaymentRequestBody";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.API_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }

  async createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;

    paymentRequestBody.products.forEach((product) => {
      sumAmount += product.price * product.quantity;
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(sumAmount * 100),
      currency: paymentRequestBody.currency,
    });

    console.log(paymentIntent, "AAAAAAAAAAAAAAAAA");
    return { clientSecret: paymentIntent.client_secret };
  }
}
