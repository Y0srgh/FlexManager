import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials = [
    { text: 'Best gym experience ever!', author: 'Alex Johnson' },
    { text: 'Amazing nutritionists and facilities.', author: 'Maria Lopez' }
  ];
}
