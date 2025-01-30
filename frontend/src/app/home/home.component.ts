import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards = [
    { title: 'Dashboard', icon: 'dashboard', route: '/dashboard', image: 'assets/dashboard.png' }, 
    { title: 'Classes', icon: 'class', route: '/classes', image: 'assets/classes.webp' }, 
    { title: 'Nutrition', icon: 'restaurant', route: '/nutrition', image: 'assets/nutrition.jpg' }, 

    { title: 'Performance', icon: 'trending_up', route: '/performance', image: 'assets/performance.png' },
    { title: 'Private Sessions', icon: 'fitness_center', route: '/private-sessions', image: 'assets/private.png' }, 


    { title: 'Plannings', icon: 'event', route: '/calendar', image: 'assets/calendar.webp' },
    { title: 'Subscriptions', icon: 'subscriptions', route: '/subscriptions', image: 'assets/subscriptions.jpg' }, 
    { title: 'Payments', icon: 'credit_card', route: '/payments', image: 'assets/payment.avif' }, 
    { title: 'Contact Us', icon: 'contact_mail', route: '/contact-us' , image: 'assets/contact.webp'}, 
    { title: 'Help & Support', icon: 'help', route: '/help-support', image: 'assets/help.webp' },
 

  ];

}
