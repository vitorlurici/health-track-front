import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthValidators } from '../../auth.validators';
import { EyeHiddenComponent } from '../eye-hidden.component';
import { EyeOpenComponent } from '../eye-open.component';

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

  private fb = inject(FormBuilder);
  private authValidators = inject(AuthValidators);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    keepConnected: [false],
  });

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    keepConnected: [false],
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
