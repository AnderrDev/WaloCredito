import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Teléfono con 10 dígitos
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    // this.authService.login(this.loginForm.value).subscribe({
    //   next: (res) => {
    //     localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
    //   },
    //   error: () => {
    //     this.errorMessage = 'Número de teléfono o contraseña incorrectos';
    //     this.loading = false;
    //   }
    // });

    // try {
    //   this.authService.login(this.loginForm.value).then(() => {
    //     this.router.navigate(['/dashboard']);
    //   });
    // }
    // catch (error) {
    //   this.errorMessage = 'Número de teléfono o contraseña incorrectos';
    //   this.loading = false

    // }
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
