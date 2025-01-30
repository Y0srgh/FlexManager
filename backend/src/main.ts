import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RequestLoggingInterceptor } from './request-logging/request-logging.interceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.useGlobalInterceptors(new RequestLoggingInterceptor)

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true,forbidNonWhitelisted: true }));

  app.enableCors({ origin: 'http://localhost:4200', credentials: true });
  
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();