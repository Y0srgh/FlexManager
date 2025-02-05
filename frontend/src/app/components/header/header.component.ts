import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  link = "/register";
  constructor( private router: Router) {}

  onJoinNowClick(): void {
    console.log('Join Now button clicked!');
    this.router.navigate(['/register']);
  }
}
