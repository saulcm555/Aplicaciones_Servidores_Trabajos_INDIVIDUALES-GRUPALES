import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar body parser explícitamente
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configurar ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Habilitar CORS para consumir desde clientes
  app.enableCors();

  const port = process.env.PORT ?? 3004;
  await app.listen(port);
  console.log(`🚀 GraphQL Gateway running on: http://localhost:${port}/graphql`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}
bootstrap();
