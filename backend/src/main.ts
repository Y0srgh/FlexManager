import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour autoriser les requêtes venant de localhost:4200
  app.enableCors({
    origin: 'http://localhost:4200', // Le front-end Angular
    methods: 'GET, POST, PUT, DELETE', // Les méthodes HTTP autorisées
    allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
  });

  await app.listen(3000); // Le port de ton backend
}
bootstrap();
