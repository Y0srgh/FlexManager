import { InjectStripeClient, StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { Injectable,Body } from '@nestjs/common';
import Stripe from 'stripe';
import { Request } from 'express';
import { SiteSubscriptionRepository } from './site-payment.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevPriceId } from 'src/enums/ReversePrice-id.enum';
import process from 'process';
@Injectable()
export class SitePaymentWebhookService {
  constructor(
    @InjectStripeClient() private stripe: Stripe,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService : UserService,
    private siteSubscriptionRepository :SiteSubscriptionRepository


) {}

  @StripeWebhookHandler('customer.subscription.updated')
  async handleSubscriptionUpdate(event: Stripe.Event): Promise<void> {
    const dataObject = event.data.object as Stripe.Subscription;
    const customer : any = await this.stripe.customers.retrieve(dataObject.customer.toString());
    const subuser : UserEntity = await this.userService.findOneByEmailUsername(  customer.email, customer.name );
    const priceId = dataObject.items.data[0].plan.id;
    console.log(subuser);  
      const subscription = await this.siteSubscriptionRepository.create({
        stripeCustomerId:dataObject.customer.toString(),
        stripeSubscriptionId:  dataObject.id,
        priceId: priceId,
        isActive:dataObject.items.data[0].plan.active,
        Plan: RevPriceId[priceId as keyof typeof RevPriceId],
        user: subuser, 
      });
    console.log("testing ----------------------");
    console.log(subscription)
    
    console.log(dataObject.items.data[0].plan);
    console.log(dataObject.items.data[0].plan.id);
    console.log();
    // console.log('Subscription Updated:',customer.email);
    // console.log('Subscription Updated:', dataObject.metadata);
  }

  @StripeWebhookHandler('customer.subscription.deleted')
  async handleSubscriptionDelete(event: Stripe.Event): Promise<void> {
    const dataObject = event.data.object as Stripe.Subscription;
    console.log('Subscription Deleted:', dataObject);

  }


  @StripeWebhookHandler('*') 
  async handleWebhook(req: Request, @Body() body: string): Promise<void> {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
  
      const event = this.stripe.webhooks.constructEvent(body, sig, webhookSecret);

      console.log('Webhook event received:', event);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      throw new Error('Webhook signature verification failed');
    }
  }
}
