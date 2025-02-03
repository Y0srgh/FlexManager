import { InjectStripeClient, StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { Injectable,Body } from '@nestjs/common';
import Stripe from 'stripe';
import { Request } from 'express';
import { SiteSubscriptionRepository } from './site-payment.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/decorators/user.decorator';
@Injectable()
export class SitePaymentWebhookService {
  constructor(
    @InjectStripeClient() private stripe: Stripe,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private siteSubscriptionRepository :SiteSubscriptionRepository


) {}

  @StripeWebhookHandler('customer.subscription.updated')
  async handleSubscriptionUpdate(event: Stripe.Event): Promise<void> {
    const dataObject = event.data.object as Stripe.Subscription;
    const customer : any = await this.stripe.customers.retrieve(dataObject.customer.toString());
    const user = await this.userRepository.findOne({ 
        where: { 
          email: customer.email, 
          username: customer.name 
        } 
      });
    console.log(user);
    // console.log('Subscription Updated:',customer.email);
    // console.log('Subscription Updated:', dataObject.metadata);
  }

  @StripeWebhookHandler('customer.subscription.deleted')
  async handleSubscriptionDelete(event: Stripe.Event): Promise<void> {
    const dataObject = event.data.object as Stripe.Subscription;
    console.log('Subscription Deleted:', dataObject);

  }


  @StripeWebhookHandler('*') // Catch-all for other events
  async handleWebhook(req: Request, @Body() body: string): Promise<void> {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = 'your_webhook_signing_secret'; // Stripe's webhook secret

    try {
      // Ensure raw body is passed for signature verification
      const event = this.stripe.webhooks.constructEvent(body, sig, webhookSecret);

      console.log('Webhook event received:', event);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      throw new Error('Webhook signature verification failed');
    }
  }
}
