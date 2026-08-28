import "reflect-metadata";
import { env } from "@interview-kit/env/server";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("rest");
  app.enableCors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
  });

  await app.listen(3000);
  console.log("Server is running on http://localhost:3000");
}

bootstrap();
