import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'; // Assurez-vous que dotenv est bien importé

import { TestModule } from './test/test.module';
import { SubscriptionsModule } from './subscription/subscription.module';

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

@Module({
  imports: [
    ConfigModule.forRoot(), // Charger la configuration
    TypeOrmModule.forRoot({
      type: 'postgres', // Type de base de données
      url: process.env.DATABASE_URL, // Récupérer la variable DATABASE_URL
      entities: ['dist/**/*.entity{.ts,.js}'], // Entités de l'application
      synchronize: true, // Synchroniser les entités avec la base de données (ne pas utiliser en production)
    }),
    TestModule, // Votre module de test (si nécessaire)
    SubscriptionsModule, // Module des abonnements
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
