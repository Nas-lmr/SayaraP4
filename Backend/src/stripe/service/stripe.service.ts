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

    // Create a Payment Intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(sumAmount * 100), // Convert to cents
      currency: paymentRequestBody.currency,
      payment_method_types: ["card"], // Explicitly allow card payments
    });

    return {
      ClinetSectret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    };
  }

  // async confirmPayment(paymentIntentId: string, cardDetails: any): Promise<any> {
  //   // Create a Payment Method using the provided card details
  //   const paymentMethod = await this.stripe.paymentMethods.create({
  //     type: 'card',
  //     card: {
  //       number: cardDetails.number,
  //       exp_month: cardDetails.exp_month,
  //       exp_year: cardDetails.exp_year,
  //       cvc: cardDetails.cvc,
  //     },
  //   });

  //   // Confirm the Payment Intent with the created Payment Method
  //   const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
  //     paymentIntentId,
  //     {
  //       payment_method: paymentMethod.id,
  //     }
  //   );

  //   return confirmedPaymentIntent;
  // }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<any> {
    const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
      paymentIntentId,
      {
        payment_method: paymentMethodId, // This can be a token like 'tok_visa' or an actual paymentMethodId
      }
    );

    return confirmedPaymentIntent;
  }
}
