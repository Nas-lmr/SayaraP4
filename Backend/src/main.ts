import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CLIENT_URL, 
      credentials: true, 
  });
  await app.listen(process.env.APP_PORT, () => {
    console.log("i am the backend connected to", process.env.APP_PORT);
  });
}
bootstrap();
