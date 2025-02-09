import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Ensure proper imports
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService, private router: Router) { // ✅ Inject Router properly
    this.user = this.authService.getUser();
  }

  editField(field: string) {
    const newValue = prompt(`Modifier votre ${field}:`, this.user[field]);
    if (newValue !== null && newValue.trim() !== '') {
      this.user[field] = newValue;
      localStorage.setItem('user', JSON.stringify(this.user)); // ✅ Update user data in local storage
    }
  }

  deleteAccount() {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      this.router.navigate(['/register']); // ✅ Ensure Router is injected
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // ✅ Redirect user after logout
  }
}
