import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import JwtResponse from '../../model/JwtResponse';
import { SessionService } from '../sessionManager/session.service';
import { Price } from '../../../enums/PlanPriceId';
import { BaseService } from 'src/app/base/base.service';
@Injectable({
  providedIn: 'root'
})
export class SitePaymentService  {
  private apiUrl ='site-payment';
  
  constructor(private http: HttpClient,
     private baseService: BaseService ) { }
  
  HandlePayment (plan : string,payment : string) : any {
    return this.http.post<any>(`${environment.BASE_URL}/site-payment/create-subscription`,{priceId: this.getPrice(plan),paymentMode : payment})
  }
  getPrice(plan: string): string {
    return Price[plan as keyof typeof Price];
  }
  getDaysSinceSubscription(subscription : any): number {
    const today = new Date();
    const diffTime = today.getTime() - subscription.updatedAt;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
  }
  getRealPrice(priceId : string){
    return this.http.get<any>(`${environment.BASE_URL}/${this.apiUrl}/price?priceId=${priceId}`);
  }
}
