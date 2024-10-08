import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';  // Ensure this path matches your folder structure
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(): void {
    if (this.email && this.password) {
      const credentials = { email: this.email, password: this.password };

      this.userService.login(credentials).subscribe(
        (response) => {
          // Save the token and navigate to the dashboard or home page
          this.userService.saveAuthToken(response.token);  // Assuming token is in response
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.errorMessage = 'Invalid email or password';
          console.error('Login failed', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in both email and password';
    }
  }

}
