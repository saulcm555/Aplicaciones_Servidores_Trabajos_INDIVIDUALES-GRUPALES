import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🚧 Configurar ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🚀 Establecer prefijo global para las rutas REST
  app.setGlobalPrefix('api/v1');

  // 📘 Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Marketplace')
    .setDescription('Documentación de la API REST del sistema de carritos y productos')
    .setVersion('1.0')
    .addTag('Admins', 'Gestión de administradores')
    .addTag('Carts', 'Gestión de carritos de compra')
    .addTag('Categories', 'Gestión de categorías y subcategorías')
    .addTag('Clients', 'Gestión de clientes')
    .addTag('Deliveries', 'Gestión de entregas')
    .addTag('Inventories', 'Gestión de inventarios')
    .addTag('Orders', 'Gestión de órdenes')
    .addTag('Payment Methods', 'Gestión de métodos de pago')
    .addTag('Product Carts', 'Productos en carritos')
    .addTag('Product Orders', 'Productos en órdenes')
    .addTag('Products', 'Gestión de productos')
    .addTag('Sellers', 'Gestión de vendedores')
    .addTag('Subcategory Products', 'Relación subcategoría-producto')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // ← Ruta http://localhost:3006/docs

  // 🟢 Iniciar servidor
  await app.listen(process.env.PORT ?? 3006);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`📄 Swagger docs available at: ${await app.getUrl()}/docs`);
}
bootstrap();
