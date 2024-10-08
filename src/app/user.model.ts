export interface User {
  id: string; // Match the type with the C# class (int -> number)
  email: string;
  password: string; // Consider handling password as a hashed string on the backend
  dob: Date; // Keep Date for date representation
  nic: string; // Ensure consistency with IdentityCardNumber
  profilePicture: File | null; // To handle file uploads
}
