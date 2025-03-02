import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { siteSubscriptions } from './entities/site-payment.entity';
@Injectable()
export class SiteSubscriptionRepository {
  constructor(
    @InjectRepository(siteSubscriptions)
    private readonly siteSubscriptionRepo: Repository<siteSubscriptions>,
  ) {}

  
  create(data: Partial<siteSubscriptions>) {
    console.log(data);
    return this.siteSubscriptionRepo.save(data);
  }

  findByUserId(id: string) : Promise<siteSubscriptions[]> {
    return this.siteSubscriptionRepo.find({ where: { user : { id } } });
  }
  findBySubscriptionId(stripeSubscriptionId : string) : Promise<siteSubscriptions>{
    return this.siteSubscriptionRepo.findOne({where : { stripeSubscriptionId }})
  }
  updateSubscription(id: string, data: Partial<siteSubscriptions>) {
    return this.siteSubscriptionRepo.update(id, data);
  }
  // save(siteSubscription : siteSubscriptions){
  //   return this.siteSubscriptionRepo.save(siteSubscription);
  // }
}