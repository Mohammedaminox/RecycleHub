import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'user';

  constructor(private router : Router) {}

  //register (local storage local)
  register(user : any): boolean {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    return true;
  }

  // //login
  login(email: string, password: string): boolean{
    const storedUser = localStorage.getItem(this.storageKey);
    if(!storedUser) return false;
    const user = JSON.parse(storedUser);

    if(user.email === email && user.password === password){
      localStorage.setItem('isLoggedIn','true');
      return true;
    }
    return false

  }
  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // Récupérer l'utilisateur connecté
  getUser(): any {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }


}
