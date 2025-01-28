import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { SiteSubscriptionRepository } from './site-payment.repository'; 
import { CreateSitePaymentDto } from './dto/create-site-payment.dto';
import { CheckSubscriptionDto } from './dto/CheckSubsccription.dto';
@Injectable()
export class SitePaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private subscriptionRepo: SiteSubscriptionRepository,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'),{});
  }

  async createCustomer(email: string, name: string) {
    return await this.stripe.customers.create({ email, name });
  }

  async createSubscription(createSitePaymentDto : CreateSitePaymentDto) {
    const subscription = await this.stripe.subscriptions.create({
      customer: createSitePaymentDto.customerId,
      items: [{ price: createSitePaymentDto.priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    // Save subscription details to the database
    await this.subscriptionRepo.create({
      userId: createSitePaymentDto.userId,
      stripeCustomerId: createSitePaymentDto.customerId,
      stripeSubscriptionId: subscription.id,
      priceId:createSitePaymentDto.priceId,
      isActive: subscription.status === 'active',
    });

    return subscription;
  }
  checkCurrentSubscription(checkSubscriptionDto: CheckSubscriptionDto) {
    const { userId, customerId } = checkSubscriptionDto;

    // Check if the subscription exists for the given userId or customerId
    const subscription = this.subscriptionRepo.findByUserId(userId
    );

    if (!subscription) {
      return { message: 'No active subscription found.' };
    }
    return { 
      message: 'Subscription found',
      data: subscription 
    };
  }

  async cancelSubscription(cancelSubscriptionDto: CheckSubscriptionDto) {
    const { userId, customerId } = cancelSubscriptionDto;
    const subscription = await this.subscriptionRepo.findByUserId(userId);

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
