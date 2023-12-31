import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const fs = require("fs");

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync("./secrets/privkey.pem"),
    cert: fs.readFileSync("./secrets/fullchain.pem"),
  };

  const app = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("API Italian Consulate")
    .setDescription("API Italian Consulate")
    .setVersion("1.0")
    .addTag("consul")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(443);
}

bootstrap();
