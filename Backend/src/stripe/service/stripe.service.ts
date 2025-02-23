import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PaymentRequestBodyDto } from "../dto/stripe.paymentRequestBody.dto.";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.API_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }

  async createPayment(paymentRequestBody: PaymentRequestBodyDto): Promise<any> {
    let sumAmount = 0;

    paymentRequestBody.products.forEach((product) => {
      sumAmount += product.price * product.quantity;
    });

    // Create or retrieve a customer in Stripe
    const customer = await this.stripe.customers.create({
      name: paymentRequestBody.customer.name,
      email: paymentRequestBody.customer.email,
    });
    const departureTime = paymentRequestBody.products[0].date.toISOString();

    // Create a Payment Intent and associate it with the customer
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(sumAmount * 100), // Convert to cents
      currency: paymentRequestBody.currency,
      customer: customer.id,
      payment_method_types: ["card"],
      metadata: {
        customer_name: paymentRequestBody.customer.name,
        customer_email: paymentRequestBody.customer.email,
        product_1_name: paymentRequestBody.products[0].title,
        product_1_quantity: paymentRequestBody.products[0].quantity,
        departure_time: departureTime,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    };
  }

  async getPaymentSecret(paymentIntentId: string): Promise<any> {
    const paymentIntent =
      await this.stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.client_secret;
  }

  async refundPayment(paymentIntentId: string): Promise<any> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
      return refund;
    } catch (error) {
      throw new Error(`Refund failed: ${error.message}`);
    }
  }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<any> {
    const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
      paymentIntentId,
      {
        payment_method: paymentMethodId,
      }
    );

    return confirmedPaymentIntent;
  }
}
