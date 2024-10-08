import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../user.model';  // Import the User model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;  // Holds the fetched user data
  updatedUser: Partial<User> = { dob: new Date(), nic: '' };  // Initialize properties
  successMessage: string = '';  // Success message after profile update
  errorMessage: string = '';  // Error message after profile update
  selectedFile: File | null = null;  // Holds the selected file (if any)

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Fetch the user profile on component initialization
  loadUserProfile(): void {
    const userId = '1';  // Replace with actual user ID
    this.userService.getUserProfile(userId).subscribe(
      (user: User) => {
        this.user = user;
        this.updatedUser = { dob: user.dob, nic: user.nic };  // Initialize updatedUser
      },
      (error) => {
        this.errorMessage = 'Failed to load user profile';
      }
    );
  }

  // Handle file selection for the profile picture
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  // Submit form to update the user profile
  // Submit form to update the user profile
  onUpdateProfile(): void {
    if (!this.user) {
      this.errorMessage = 'User not found!';
      return;
    }
  
    // Use the full user object instead of the partial one
    this.userService.updateUserProfile(this.user.id, this.user).subscribe(
      (response) => {
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Failed to update profile';
        this.successMessage = '';
      }
    );
  }
  
  

}
