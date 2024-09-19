import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { StripeService } from '../service/stripe.service';
import { PaymentRequestBody } from '../PaymentRequestBody';
import { Response } from 'express'; 

@Controller('payments')
export class StripeController {
  constructor(private paymentService: StripeService) {}

  @Post()
  createPayments(
    @Res() response: Response, 
    @Body() paymentRequestBody: PaymentRequestBody,
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
}
