import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards = [
    { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' }, 
    { title: 'Classes', icon: 'class', route: '/classes' }, 
    { title: 'Plannings', icon: 'event', route: '/plannings' },
    { title: 'Subscriptions', icon: 'subscriptions', route: '/subscriptions' }, 
    { title: 'Payments', icon: 'credit_card', route: '/payments' }, 
    { title: 'Private Sessions', icon: 'fitness_center', route: '/private-sessions' }, 
    { title: 'Nutrition', icon: 'restaurant', route: '/nutrition' }, 
    { title: 'Contact Us', icon: 'contact_mail', route: '/contact-us' }, 
    { title: 'Performance', icon: 'trending_up', route: '/performance' },
    { title: 'Help & Support', icon: 'help', route: '/help-support' },
 

  ];
  
}
