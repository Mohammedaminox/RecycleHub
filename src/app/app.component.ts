import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Allows routing inside app
  template: `<router-outlet></router-outlet>`, // Displays pages dynamically
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.initializeCollectors();
  }

  private initializeCollectors() {
    this.authService.addPreRegisteredCollectors();
  }
}
