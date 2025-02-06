import { Component } from '@angular/core';
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
      roles: ['manager'],
      image: 'assets/dashboard.png',
    },
    {
      title: 'Manage Coaches',
      icon: 'dashboard',
      route: '/add-coach',
      roles: ['manager'],
      image: 'https://www.ownsport.fr/blog/wp-content/uploads/2018/01/marche-coach-sportif-1024x637.jpg',
    },
    {
      title: 'Requests',
      icon: 'requests',
      route: '/requests',
      roles: ['coach'],
      image: 'https://www.ownsport.fr/blog/wp-content/uploads/2018/01/marche-coach-sportif-1024x637.jpg',
    },
    {
      title: 'Classes',
      icon: 'class',
      route: '/course',
      image: 'assets/classes.webp',
      roles: ['manager', 'coach', 'client'],
    },
    {
      title: 'Nutrition',
      icon: 'restaurant',
      route: '/nutrition',
      image: 'assets/nutrition.jpg',
      roles: ['client'],
    },
    {
      title: 'Performance',
      icon: 'trending_up',
      route: '/tracker',
      image: 'assets/performance.png',
      roles: ['client'],
    },
    {
      title: 'Private Sessions',
      icon: 'fitness_center',
      route: '/coaches',
      image: 'assets/private.png',
      roles: ['manager', 'coach', 'client'],
    },
    {
      title: 'Plannings',
      icon: 'event',
      route: '/calendar',
      image: 'assets/calendar.webp',
      roles: ['client', 'coach'],
    },
    {
      title: 'Subscriptions',
      icon: 'subscriptions',
      route: '/subscription',
      image: 'assets/subscriptions.jpg',
      roles: ['client', 'coach', 'manager'],
    },
    {
      title: 'Payments',
      icon: 'credit_card',
      route: '/manage-subscription',
      image: 'assets/payment.avif',
      roles: ['client'],
    },
    {
      title: 'Association Requests',
      icon: 'users',
      route: '/pending-child-request',
      image: 'https://www.nautilusplus.com/content/uploads/2018/02/parent-enfant-lowres.jpg',
      roles: ['client', 'parent'],
    },
    {
      title: 'Associate a Child',
      icon: 'users',
      route: '/associate-child',
      image: 'https://www.pennes-mirabeau.org/images/icagenda/thumbs/themes/ic_large_w900h600q100_gym-parent-enfant.jpg',
      roles: ['parent'],
    },
    {
      title: 'Chat with us',
      icon: 'contact_mail',
      route: '/chat',
      image: 'assets/contact.webp',
      roles: ['client', 'parent', 'coach'],
    },
    {
      title: 'Help & Support',
      icon: 'help',
      route: '/help-support',
      image: 'assets/help.webp',
      roles: ['client', 'parent', 'coach'],
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
