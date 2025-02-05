import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { SiteSubscriptionRepository } from './site-payment.repository'; 
import { CreateSitePaymentDto } from './dto/create-site-payment.dto';
import { CheckSubscriptionDto } from './dto/CheckSubsccription.dto';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
@Injectable()
export class SitePaymentService {

  constructor(
    private configService: ConfigService,
    @InjectStripeClient() private stripe : Stripe,
    private subscriptionRepo: SiteSubscriptionRepository,
  ) {
  }

  async createCustomer(email: string, name: string) {
    return await this.stripe.customers.create({ email, name });
  }

  async createSubscriptionSession(
    userId : string,
    customerId: any,
    priceId: string,
    payment : 'payment' | 'subscription',
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      return this.stripe.checkout.sessions.create({
        success_url: 'http://localhost:4200/success',
        cancel_url : 'http://localhost:4200/failed',
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: payment,
      metadata : {
        userId : userId,
        paymentMode : payment,
        priceId : priceId,
      }
      }
    );
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }
  async getpaymentIntent(priceid: string){
    return await this.stripe.prices.retrieve(priceid);

  }
  checkCurrentSubscription(user : any , customerId : string) {
    const subscription = this.subscriptionRepo.findByUserId(user
    );

    if (!subscription) {
      return { message: 'No active subscription found.' };
    }
    return { 
      message: 'Subscription found',
      data: subscription 
    };
  }

  async cancelSubscription(user : any , customerId : string) {
    const subscription = await this.subscriptionRepo.findByUserId(user.id);

    if (!subscription) {
      return { message: 'No subscription found to cancel.' };
    }

    try {
      const subscriptionId = subscription.stripeSubscriptionId;

      const canceledSubscription = await this.stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true, 
      });
      subscription.isActive = false;
      await this.subscriptionRepo.updateSubscription(subscriptionId,subscription);

      return {
        message: 'Subscription canceled successfully in Stripe.',
        data: canceledSubscription,
      };
    } catch (error) {
      return { message: 'Error canceling subscription in Stripe.', error: error.message };
    }
  }
}
