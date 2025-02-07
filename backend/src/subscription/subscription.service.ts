import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class SubscriptionsService extends BaseService<Subscription> {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {
    super(subscriptionRepository);
  }

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    return super.create(createSubscriptionDto);
  }

  async findAll(): Promise<Subscription[]> {
    return super.findAll();
  }

  async findOne(id: string): Promise<Subscription> {
    return super.findOne(id);
  }
  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    return super.update(id, updateSubscriptionDto);
  }

  async remove(id: number): Promise<void> {
    return super.delete(id.toString());
  }
}
