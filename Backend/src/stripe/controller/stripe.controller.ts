import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { StripeService } from "../service/stripe.service";
import { PaymentRequestBody } from "../PaymentRequestBody";
import { Response } from "express";

@Controller("payments")
export class StripeController {
  constructor(private paymentService: StripeService) {}

  // Endpoint to create the Payment Intent
  @Post()
  createPayments(
    @Res() response: Response,
    @Body() paymentRequestBody: PaymentRequestBody
  ) {
    this.paymentService
      .createPayment(paymentRequestBody)
      .then((res) => {
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch((err) => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }

  //confirm the Payment Intent with a card
  // @Post("confirm")
  // confirmPayment(
  //   @Res() response: Response,
  //   @Body() body: { paymentIntentId: string; cardDetails: any }
  // ) {
  //   const { paymentIntentId, cardDetails } = body;

  //   this.paymentService
  //     .confirmPayment(paymentIntentId, cardDetails)
  //     .then((res) => {
  //       response.status(HttpStatus.OK).json(res);
  //     })
  //     .catch((err) => {
  //       response.status(HttpStatus.BAD_REQUEST).json(err);
  //     });
  // }

  @Post("confirm")
  async confirmPayment(
    @Res() response: Response,
    @Body() body: { paymentIntentId: string; paymentMethodId: string } // Accept paymentMethodId instead of card details
  ) {
    const { paymentIntentId, paymentMethodId } = body;

    try {
      const confirmedPaymentIntent = await this.paymentService.confirmPayment(
        paymentIntentId,
        paymentMethodId
      );
      response.status(HttpStatus.OK).json({
        success: true,
        message: "Payment confirmed successfully",
        confirmedPaymentIntent,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Payment confirmation failed",
        error: error.message,
      });
    }
  }
}
