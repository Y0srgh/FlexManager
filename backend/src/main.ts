import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RequestLoggingInterceptor } from './request-logging/request-logging.interceptor';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true,rawBody: true });
  app.use(cookieParser());
  app.useGlobalInterceptors(new RequestLoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    preflightContinue: false,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept','Content-Type', 'Authorization', 'x-new-access-token','stripe-signature'],
    exposedHeaders: ['x-new-access-token'],
  });

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); 
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'x-new-access-token');
    res.removeHeader('Vary'); 
    next();
  });
  // app.enableCors({
  //   origin: 'http://localhost:4200',
  //   methods: ['PUT,POST,GET,DELETE,OPTIONS'],
  //   allowedHeaders: ['Content-Type,Content-Length', 'Authorization', 'Accept,X-Requested-With'],
  // });

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Set a specific origin
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  //   );
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  //   // Handle preflight requests
  //   if (req.method === 'OPTIONS') {
  //     return res.sendStatus(200);
  //   }

  //   next();
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
