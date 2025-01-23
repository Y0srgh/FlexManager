import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() route: string = '';
  @Input() image: string = '';

  constructor(private router: Router) {}


  onCardClick(): void {
    if (this.route) {
      this.router.navigate([this.route]);
      console.log(this.route);
    } else {
      console.warn('No route defined for this card');
    }
  }
}
