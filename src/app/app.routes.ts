import { Routes } from '@angular/router';
import {authGuard} from "./auth/auth.guard";
import {ProfileComponent} from "./auth/profile/profile.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {ParticulierDashboardComponent} from "./particulier-dashboard/particulier-dashboard.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'particulier-dashboard', component: ParticulierDashboardComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] }
];

