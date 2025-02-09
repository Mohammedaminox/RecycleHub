import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'users';
  private readonly loggedInKey = 'isLoggedIn';
  private readonly currentUserKey = 'currentUser';

  constructor(private router: Router) {}

  //  Utility function to safely access localStorage
  private getStorage(): Storage | null {
    return typeof window !== 'undefined' ? localStorage : null;
  }

  // Register a new user
  register(user: any): boolean {
    const storage = this.getStorage();
    if (!storage) return false; // Prevent error in SSR

    let users = JSON.parse(storage.getItem(this.storageKey) || '[]');

    if (users.some((u: any) => u.email === user.email)) {
      alert('Email already exists!');
      return false;
    }

    users.push(user);
    storage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  // Login system
  login(email: string, password: string): boolean {
    const storage = this.getStorage();
    if (!storage) return false;

    const users = JSON.parse(storage.getItem(this.storageKey) || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      storage.setItem(this.loggedInKey, 'true');
      storage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Check authentication
  isAuthenticated(): boolean {
    const storage = this.getStorage();
    return storage ? storage.getItem(this.loggedInKey) === 'true' : false;
  }

  // Get current logged-in user
  getUser(): any {
    const storage = this.getStorage();
    return storage ? JSON.parse(storage.getItem(this.currentUserKey) || '{}') : null;
  }

  // Pre-register Collectors (Prevent SSR Errors)
  addPreRegisteredCollectors() {
    const storage = this.getStorage();
    if (!storage) return; // Prevent error in SSR

    let users = JSON.parse(storage.getItem(this.storageKey) || '[]');

    // Prevent duplicate entries
    if (users.some((u: any) => u.role === 'collecteur')) {
      return;
    }

    const collectors = [
      {
        name: 'Ali',
        lastname: 'Collector',
        adresse: 'Casablanca',
        phone: '0612345678',
        birthday: '1990-01-01',
        email: 'collector@recyclehub.com',
        password: 'collector123',
        role: 'collecteur'
      }
    ];

    users.push(...collectors);
    storage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Logout user
  logout(): void {
    const storage = this.getStorage();
    if (!storage) return;

    storage.removeItem(this.loggedInKey);
    storage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }
}
