import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';

const fs = require('fs');

const file = fs.readFileSync('./4A4F5406C904654CDA832580B546F371.txt');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // No explicit type for NestExpressApplication

  app.useGlobalPipes(new ValidationPipe());





  const config = new DocumentBuilder()
    .setTitle('API Italian Consulate')
    .setDescription('API Italian Consulate')
    .setVersion('1.0')
    .addTag('consul')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
