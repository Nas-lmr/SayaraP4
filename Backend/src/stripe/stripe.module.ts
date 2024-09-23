import { Module } from "@nestjs/common";
import { StripeController } from "./controller/stripe.controller";
import { StripeService } from "./service/stripe.service";

@Module({
  controllers: [StripeController],

  providers: [StripeService],
})
export class StripeModule {}
