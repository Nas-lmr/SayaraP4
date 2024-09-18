import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL, // Frontend URL
      credentials: true, // Permet l'envoi des cookies/identifiants
  });
  await app.listen(process.env.APP_PORT, () => {
    console.log("i am the backend connected to", process.env.APP_PORT);
  });
}
bootstrap();
