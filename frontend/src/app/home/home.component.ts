import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards = [
    { title: 'Dashboard', icon: 'dashboard', route: '/dashboard', image: 'assets/dashboard3.png' }, 
    { title: 'Classes', icon: 'class', route: '/classes', image: 'assets/classes.png' }, 
    { title: 'Nutrition', icon: 'restaurant', route: '/nutrition', image: 'assets/nutrition.png' }, 

    { title: 'Performance', icon: 'trending_up', route: '/performance', image: 'assets/performance.png' },
    { title: 'Private Sessions', icon: 'fitness_center', route: '/private-sessions', image: 'assets/private.png' }, 


    { title: 'Plannings', icon: 'event', route: '/plannings', image: 'assets/planning2.png' },
    { title: 'Subscriptions', icon: 'subscriptions', route: '/subscriptions', image: 'assets/subscriptions.png' }, 
    { title: 'Payments', icon: 'credit_card', route: '/payments', image: 'assets/payment.png' }, 
    { title: 'Contact Us', icon: 'contact_mail', route: '/contact-us' , image: 'assets/contact.png'}, 
    { title: 'Help & Support', icon: 'help', route: '/help-support', image: 'assets/support.png' },
 

  ];
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  
}
