import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OneTimePayment } from './entities/One-time-Payment.entity';
@Injectable()
export class OneTimePaymentRepo {
  constructor(
    @InjectRepository(OneTimePayment)
    private readonly siteSubscriptionRepo: Repository<OneTimePayment>,
  ) {}

  
  create(data: Partial<OneTimePayment>) {
    console.log(data);
    return this.siteSubscriptionRepo.save(data);
  }

  findByUserId(id: string) {
    return this.siteSubscriptionRepo.findOne({ where: { user : { id } } });
  }

  updateSubscription(id: string, data: Partial<OneTimePayment>) {
    return this.siteSubscriptionRepo.update(id, data);
  }
  save(siteSubscription : OneTimePayment){
    return this.siteSubscriptionRepo.save(siteSubscription);
  }
}
