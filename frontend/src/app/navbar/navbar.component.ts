import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  onNotificationsClick() {
    console.log('Notifications clicked!');
    // You can add logic to open a notifications dropdown or modal
  }

  onProfileClick() {
    console.log('Profile clicked!');
    // You can add logic to navigate to a profile page or open a profile menu
  }
}
