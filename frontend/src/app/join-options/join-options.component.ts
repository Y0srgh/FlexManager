import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface JoinOption {
  type: 'parent' | 'sportsman';
  label: string;
  iconClass: string;
}

@Component({
  selector: 'app-join-options',
  templateUrl: './join-options.component.html',
  styleUrls: ['./join-options.component.scss']
})
export class JoinOptionsComponent {
  joinOptions: JoinOption[] = [
    {
      type: 'parent',
      label: 'Join as Parent',
      iconClass: 'fa-solid fa-user-group'
    },
    {
      type: 'sportsman',
      label: 'Join as Sportsman',
      iconClass: 'fa-solid fa-user'
    }
  ];

  constructor(private router: Router) {}

  onJoinClick(type: 'parent' | 'sportsman'): void {
    this.router.navigate(['/signup', type]);
  }

  onSignInClick(): void {
    this.router.navigate(['/signin']);
  }
}
