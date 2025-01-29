import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true,forbidNonWhitelisted: true }));
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOptions);

}
bootstrap();