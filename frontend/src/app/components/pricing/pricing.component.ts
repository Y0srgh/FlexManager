import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  pricingPlans = [
    {
      name: 'Beginner Plan',
      price: '$10 / Month',
      features: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
      delay: 100,
      featured: false
    },
    {
      name: 'Premium Plan',
      price: '$15 / Month',
      features: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
      delay: 200,
      featured: true
    },
    {
      name: 'Advanced Plan',
      price: '$20 / Month',
      features: ['Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet.'],
      delay: 200,
      featured: false
    }
  ];

  onChoosePlan() {
    // Handle plan selection
  }
}
