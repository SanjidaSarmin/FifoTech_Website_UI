import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/Auth/auth-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.checkIfAlreadyLoggedIn();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkIfAlreadyLoggedIn(): void {
    if (this.storageService.isLoggedIn() && !this.storageService.isTokenExpired()) {
      this.redirectBasedOnRole();
    }
  }

  redirectBasedOnRole(): void {
    const role = this.storageService.getUserRole();
    if (role) {
      switch (role) {
        case 'ROLE_ADMIN':
          this.router.navigate(['/admin/dashboard']);
          break;
      }
    } else {
      this.errorMessage = "Invalid email or password!";
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoading = false;
        this.redirectBasedOnRole();
      },
      error: err => {
        this.isLoading = false;
        if (err.error && err.error.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = "Invalid email or password.";
        }
      }
    });
  }
}