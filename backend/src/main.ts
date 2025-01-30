import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT || 4000);
console.log(`Server running on http://localhost:${process.env.PORT || 4000}`);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true,forbidNonWhitelisted: true }));
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOptions);

}
bootstrap();