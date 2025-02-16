import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  await app.listen(process.env.APP_PORT, () => {});
}
bootstrap();
