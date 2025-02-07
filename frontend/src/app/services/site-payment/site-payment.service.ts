import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import JwtResponse from '../../model/JwtResponse';
import { SessionService } from '../sessionManager/session.service';
import { Price } from '../../../enums/PlanPriceId';
import { BaseService } from 'src/app/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitePaymentService  {
  private apiUrl ='site-payment';
  
  constructor(private http: HttpClient,
     private baseService: BaseService ) { }
  
  public HandlePayment (plan : string,payment : string) : any {
    console.log("selectiong a plan",this.getPrice(plan),Price[plan.toUpperCase() as keyof typeof Price]);
    return this.http.post<any>(`${environment.BASE_URL}/site-payment/site-payment`,{priceId: this.getPrice(plan),paymentMode : payment},{withCredentials: true})
  }
  getPrice(plan: string): string {
    return Price[plan.toUpperCase() as keyof typeof Price];
  }
  getDaysSinceSubscription(subscription : any): number {
    const today = new Date();
    const diffTime = today.getTime() - subscription.updatedAt;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
  }
  public getUserCurrentSubscription(): Observable<any> {
    return  this.http.get<any>(`${environment.BASE_URL}/${this.apiUrl}/site-payment/UserSubscription`);
  }

  public getRealPrice(priceId : string):  Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/${this.apiUrl}/price/${priceId}`);
  }
}