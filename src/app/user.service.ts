import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7101/api/User';
  private tokenKey = 'authToken';  // Key to store token in localStorage

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();  // Returns true if token exists
  }


  // Register User
  register(user: User): Observable<any> {
    const date = new Date(user.dob);

    // Manually format the date as 'YYYY-MM-DDTHH:mm:ss.sssZ'
    const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}.${date.getMilliseconds().toString().padStart(3, '0')}Z`;

    const payload = {
        email: user.email,                 // Match backend field 'email'
        password: user.password,           // Match backend field 'password'
        dob: formattedDate,                // Match backend field 'dob', formatted as 'YYYY-MM-DDTHH:mm:ss.sssZ'
        nic: user.nic                      // Match backend field 'nic' (IdentityCardNumber)
    };

    console.log('Register payload:', payload); // Log the payload to verify

    return this.http.post(`${this.apiUrl}/register`, payload);
}








  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-reset-password-link`, { email });
  }


  // Method to get the user profile
  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/${userId}`);
  }
  updateUserProfile(userId: string, user: User): Observable<any> {
  const formData = new FormData();

  // Format the DateOfBirth to YYYY-MM-DDT00:00:00
  const date = new Date(user.dob);
  const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T00:00:00`; // Format as YYYY-MM-DDT00:00:00

  formData.append('Email', user.email);  // Email is non-editable
  formData.append('DateOfBirth', formattedDate);  // Add the formatted DateOfBirth
  formData.append('IdentityCardNumber', user.nic);

  // Update the user profile with FormData
  return this.http.put(`${this.apiUrl}/users/${userId}`, formData);
}

  
  
}
