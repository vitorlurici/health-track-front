import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthValidators } from '../../auth.validators';
import { EyeHiddenComponent } from '../eye-hidden.component';
import { EyeOpenComponent } from '../eye-open.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-content-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    EyeHiddenComponent,
    EyeOpenComponent,
  ],
  templateUrl: './content-auth.component.html',
  styleUrls: ['./content-auth.component.scss'],
})
export class ContentAuthComponent {
  @Input() activeButton: number | null = 1;

  showPassword = false;
  isLoading = false;
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authValidators = inject(AuthValidators);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^\d{2}\d{4,5}\d{4}$/)],
    ],
    weight: [
      '',
      [Validators.required, Validators.min(30), Validators.max(300)],
    ],
    height: [
      '',
      [Validators.required, Validators.min(0.5), Validators.max(2.5)],
    ],
    birth: ['', [Validators.required]],
    cpf: ['', [Validators.required, AuthValidators.cpfValidator]],
    keepConnected: [false],
  });

  maxBirthDate: string;

  constructor() {
    const today = new Date();
    this.maxBirthDate = today.toISOString().split('T')[0];
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    keepConnected: [false],
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  formatCpf(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 3) {
      value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
      value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
      value = value.substring(0, 11) + '-' + value.substring(11, 13);
    }

    this.registerForm.patchValue(
      {
        cpf: value.substring(0, 14),
      },
      { emitEvent: false }
    );
  }

  onSubmitRegister(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const { name, email, password, phone, weight, height, birth, cpf } =
      this.registerForm.value;

    this.authService
      .register(
        name!,
        email!,
        password!,
        phone!,
        Number(weight),
        Number(height),
        birth!,
        cpf!.replace(/\D/g, '')
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message ||
            'Erro ao cadastrar paciente. Tente novamente.';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password, keepConnected } = this.loginForm.value;

    this.authService.login(email!, password!, keepConnected!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;

        if (error.status === 401) {
          this.errorMessage = 'Credenciais inválidas';
        } else if (error.status === 0) {
          this.errorMessage = 'Não foi possível conectar ao servidor';
        } else {
          this.errorMessage = error.error?.message || 'Erro ao fazer login';
        }

        console.error('Erro no login:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
