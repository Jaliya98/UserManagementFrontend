import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; // Adjust the path as necessary
import { RegisterComponent } from './components/register/register.component'; // Adjust the path as necessary
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'; // Adjust the path as necessary
import { ProfileComponent } from './components/profile/profile.component'; // Adjust the path as necessary

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: '/login' } // Wildcard route to redirect any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
