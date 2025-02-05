import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
