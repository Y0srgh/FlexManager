import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  cards = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      roles: ['admin', 'coach', 'client'],
      image: 'assets/dashboard.png',
    },
    {
      title: 'Classes',
      icon: 'class',
      route: '/course',
      image: 'assets/classes.webp',
      roles: ['admin', 'coach', 'client'],
    },
    {
      title: 'Nutrition',
      icon: 'restaurant',
      route: '/nutrition',
      image: 'assets/nutrition.jpg',
      roles: ['admin', 'coach'],
    },

    {
      title: 'Performance',
      icon: 'trending_up',
      route: '/tracker',
      image: 'assets/performance.png',
      roles: ['admin', 'coach'],
    },
    {
      title: 'Private Sessions',
      icon: 'fitness_center',
      route: '/coaches',
      image: 'assets/private.png',
      roles: ['admin', 'coach'],
    },

    {
      title: 'Plannings',
      icon: 'event',
      route: '/calendar',
      image: 'assets/calendar.webp',
      roles: ['admin', 'coach'],
    },
    {
      title: 'Subscriptions',
      icon: 'subscriptions',
      route: '/subscriptions',
      image: 'assets/subscriptions.jpg',
      roles: ['admin', 'coach'],
    },
    {
      title: 'Payments',
      icon: 'credit_card',
      route: '/payments',
      image: 'assets/payment.avif',
      roles: ['admin', 'coach'],
    },
    {
      title: 'Contact Us',
      icon: 'contact_mail',
      route: '/contact-us',
      image: 'assets/contact.webp',
      roles: ['admin', 'coach'],
    },
    {
      title: 'Help & Support',
      icon: 'help',
      route: '/help-support',
      image: 'assets/help.webp',
      roles: ['admin', 'coach'],
    },
  ];

  filteredCards: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const userRole = this.auth.getCurrentUserRole();
    this.filteredCards = this.cards.filter((card) =>
      card.roles.includes(userRole!)
    );
  }
}
