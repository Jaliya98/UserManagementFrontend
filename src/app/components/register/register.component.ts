import { Component } from '@angular/core';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrected from styleUrl to styleUrls
})
export class RegisterComponent {

  user: Partial<User> = {                              // Define the form model for registration
    email: '',
    password: '',
    dob: new Date(),
    nic: '',
    profilePicture: null
  };

  constructor(private userService: UserService, private router: Router) {}

  // Handle profile picture file selection
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.user.profilePicture = input.files[0];  // Assign the selected file to the user object
    }
  }

  // Register user
  onRegister(): void {
    if (this.user.email && this.user.password && this.user.dob && this.user.nic) {
      // Call the UserService to register the user
      console.log(this.user);
      this.userService.register(this.user as User).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          // Redirect to login after registration
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during registration:', error);
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }
}
