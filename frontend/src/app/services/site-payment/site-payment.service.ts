import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import JwtResponse from '../../model/JwtResponse';
import { SessionService } from '../sessionManager/session.service';
import { Price } from '../../../enums/PlanPriceId';
@Injectable({
  providedIn: 'root'
})
export class SitePaymentService {

  constructor(private  http: HttpClient ) { }
  
  HandlePayment (plan : string) : any {
    return this.http.post<any>(`${environment.BASE_URL}/site-payment/create-subscription`,{priceId: this.getPrice(plan)})
  }
  getPrice(plan: string): string {
    const priceMap: Record<string, Price> = {
      freetrial: Price.FREETRIAl,
      pro: Price.PRO,
      premium: Price.PREMIEM,
    };
    return priceMap[plan.toLowerCase()] ?? null;
  }
  getDaysSinceSubscription(subscription : any): number {
    const today = new Date();
    const diffTime = today.getTime() - subscription.updatedAt;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
  }
}
