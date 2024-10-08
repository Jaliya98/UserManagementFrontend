import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';  // Bind the email field
  message: string = '';  // Success message
  errorMessage: string = '';  // Error message

  constructor(private httpClient: HttpClient) {} // Inject HttpClient

  // Method to send the reset password request
  onResetPassword(form: NgForm) {
    const email = form.value.email;

    // Basic email validation
    if (!this.validateEmail(email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Prepare form data
    const formData = new URLSearchParams();
    formData.set('email', email);

    this.httpClient.post('https://localhost:7101/api/User/send-reset-password-link', formData.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
    .subscribe({
      next: (response) => {
        this.message = 'Password reset link sent successfully.';
        this.errorMessage = ''; // Clear any previous error messages
        console.log('Password reset link sent successfully:', response);
        form.reset(); // Reset the form after success
      },
      error: (error) => {
        console.error('Error sending password reset link:', error);

        // Check error response from the backend
        if (error.error && error.error.title) {
          this.errorMessage = error.error.title; // Display the error title from the response
        } else {
          this.errorMessage = 'Failed to send reset password link. Please try again later.';
        }
        
        this.message = ''; // Clear any previous success messages
      }
    });
  }

  // Email validation function
  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return re.test(String(email).toLowerCase());
  }
}
