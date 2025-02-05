import { InjectStripeClient, StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { Injectable,Body } from '@nestjs/common';
import Stripe from 'stripe';
import { Request } from 'express';
import { SiteSubscriptionRepository } from './site-payment.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { OneTimePaymentRepo } from './one-time-payment.repository';
import { RevPriceId } from 'src/enums/ReversePrice-id.enum';
import process from 'process';
@Injectable()
export class SitePaymentWebhookService {
  constructor(
    @InjectStripeClient() private stripe: Stripe,
    private userService : UserService,
    private siteSubscriptionRepository :SiteSubscriptionRepository,
    private oneTimePaymentRepo : OneTimePaymentRepo,
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
    // user.role=""
    console.log("testing ----------------------");
    console.log(subscription)
    
    console.log(dataObject.items.data[0].plan);
    console.log(dataObject.items.data[0].plan.id);
    console.log();
    // console.log('Subscription Updated:',customer.email);
    // console.log('Subscription Updated:', dataObject.metadata);
  }

  @StripeWebhookHandler('invoice.payment_succeeded')
  async handleSubscriptionDelete(event: Stripe.Event): Promise<void> {
    const dataObject = event.data.object as Stripe.Invoice;
    console.log('Invoce detail :', dataObject);

  }
  @StripeWebhookHandler('checkout.session.completed')
  async handleOneTimePayment(event: Stripe.Event): Promise<void> {
    const dataObject = event.data.object as Stripe.PaymentIntent;
    console.log('Subscription Deleted:', dataObject.metadata);
    if (dataObject.metadata.paymentMode == 'payment'){
      const user = await this.userService.findOne(dataObject.metadata.userId);
      const priceId =RevPriceId[dataObject.metadata.priceId as keyof typeof RevPriceId]
      console.log(user,priceId);
      const OneTimePayment = await this.oneTimePaymentRepo.create({
        stripeCustomerId:dataObject.customer.toString(),
        stripePaymentId:  dataObject.id,
        priceId: dataObject.metadata.priceId,
        Plan: priceId,
        user: user, 
      });
      console.log(OneTimePayment);
    }

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
