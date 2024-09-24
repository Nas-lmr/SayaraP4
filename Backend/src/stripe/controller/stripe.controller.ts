import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { StripeService } from "../service/stripe.service";
import { PaymentRequestBodyDto } from "../dto/stripe.paymentRequestBody.dto.";
import { Response } from "express";

@Controller("payments")
export class StripeController {
  constructor(private paymentService: StripeService) {}

  @Post()
  async createPayments(
    @Res() response: Response,
    @Body() paymentRequestBody: PaymentRequestBodyDto
  ) {
    try {
      const result =
        await this.paymentService.createPayment(paymentRequestBody);

      response.status(HttpStatus.CREATED).json(result);
    } catch (err) {
      response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: err.message || "Payment creation failed",
      });
    }
  }

  @Post("refund")
  async refundPayment(
    @Res() response: Response,
    @Body() body: { paymentIntentId: string }
  ) {
    const { paymentIntentId } = body;

    try {
      const refund = await this.paymentService.refundPayment(paymentIntentId);
      response.status(HttpStatus.OK).json({
        success: true,
        message: "Refund processed successfully",
        refund,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Refund failed",
        error: error.message,
      });
    }
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
    @Body() body: { paymentIntentId: string; paymentMethodId: string }
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
