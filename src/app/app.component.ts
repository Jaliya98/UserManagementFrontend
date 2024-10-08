import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import {user-routing.module} from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , LoginComponent ,RegisterComponent,ResetPasswordComponent,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-registration-app';
}
