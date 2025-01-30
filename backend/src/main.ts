import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { BugFinderInterceptor } from './bug-finder/bug-finder.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:4200', // Adjust this based on your frontend URL
    credentials: true, // Allow sending cookies
  });

  app.useGlobalInterceptors(new BugFinderInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
