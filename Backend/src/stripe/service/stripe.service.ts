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

  async createAndConfirmPayment(
    paymentRequestBody: PaymentRequestBodyDto,
    paymentMethodId: string
  ): Promise<any> {


    let sumAmount = 0;

    paymentRequestBody.products.forEach(
      (product: { price: number; quantity: number }) => {
        sumAmount += product.price * product.quantity;
      }
    );

    const customer = await this.stripe.customers.create({
      name: paymentRequestBody.customer.name,
      email: paymentRequestBody.customer.email,
    });

    // Attach the payment method to the customer
    await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });


    // Create the Payment Intent
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
      },
    });

    //  Confirm the payment
    const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: paymentMethodId,
      }
    );

    return {
      ClientSecret: confirmedPaymentIntent.client_secret,
      paymentIntent: confirmedPaymentIntent,
    };
  }

  // refund payment method

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

  
  // async confirmPayment(
  //   paymentIntentId: string,
  //   paymentMethodId: string
  // ): Promise<any> {
  //   const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
  //     paymentIntentId,
  //     {
  //       payment_method: paymentMethodId,
  //     }
  //   );

  //   return confirmedPaymentIntent;
  // }
}
