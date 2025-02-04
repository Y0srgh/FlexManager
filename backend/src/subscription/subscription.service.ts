// src/subscription/subscription.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  // Création d'une nouvelle souscription
  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create(createSubscriptionDto);  // Crée une instance de Subscription
    return this.subscriptionRepository.save(subscription);  // Sauvegarde dans la base de données
  }

  // Récupérer toutes les souscriptions
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  // Récupérer une souscription par ID
  async findOne(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  // Mettre à jour une souscription existante
  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription> {
    const subscription = await this.findOne(id);
    if (subscription) {
      Object.assign(subscription, updateSubscriptionDto);  // Met à jour les propriétés de l'entité
      return this.subscriptionRepository.save(subscription);  // Sauvegarde les modifications
    }
    throw new Error('Subscription not found');
  }

  // Supprimer une souscription
  async remove(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
