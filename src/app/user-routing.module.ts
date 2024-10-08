import { Routes } from '@angular/router';
import { RegisterComponent } from '../app/components/register/register.component';
import { LoginComponent } from '../app/components/login/login.component';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { ResetPasswordComponent } from '../app/components/reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
