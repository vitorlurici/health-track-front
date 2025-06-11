import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientService } from '../../../../core/services/patient.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AuthValidators } from '../../../../core/validators/auth.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [ReactiveFormsModule],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  isLoading = false;
  errorMessage: string | null = null;
  maxBirthDate: string;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private authService: AuthService,
    public router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birth: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\(\d{2}\)\d{4,5}-\d{4}$/)],
      ],
      weight: [
        '',
        [Validators.required, Validators.min(30), Validators.max(300)],
      ],
      height: [
        '',
        [Validators.required, Validators.min(1), Validators.max(2.5)],
      ],
      cpf: ['', [Validators.required, AuthValidators.cpfValidator]],
    });

    const today = new Date();
    this.maxBirthDate = today.toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.loadPatientData();
  }

  loadPatientData(): void {
    this.isLoading = true;
    this.patientService.getPatient().subscribe({
      next: (patient) => {
        this.profileForm.patchValue({
          name: patient.name,
          birth: patient.birth,
          phone: patient.phone,
          weight: patient.weight,
          height: patient.height,
          cpf: patient.cpf,
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar dados do paciente';
      },
    });
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

    this.profileForm.patchValue(
      {
        cpf: value.substring(0, 14),
      },
      { emitEvent: false }
    );
  }

  formatPhone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 0) {
      value = '(' + value.substring(0, 2) + ')' + value.substring(2);
    }
    if (value.length > 9) {
      value = value.substring(0, 9) + '-' + value.substring(9);
    }

    this.profileForm.patchValue(
      {
        phone: value.substring(0, 14),
      },
      { emitEvent: false }
    );
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.profileForm.value;
    const patientData = {
      name: formValue.name!,
      birth: formValue.birth!,
      phone: formValue.phone!,
      weight: Number(formValue.weight),
      height: Number(formValue.height),
      cpf: formValue.cpf!.replace(/\D/g, ''),
    };

    this.patientService.updatePatient(patientData).subscribe({
      next: () => {
        const user = this.authService.getCurrentUser();
        if (user) {
          user.name = patientData.name;
          user.birth = patientData.birth;
          user.phone = patientData.phone;
          user.weight = patientData.weight;
          user.height = patientData.height;
          user.cpf = patientData.cpf;
          localStorage.setItem('user', JSON.stringify(user));
        }
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Update error:', error);
        this.isLoading = false;
        if (error.status === 403) {
          this.errorMessage =
            'Sessão expirada. Por favor, faça login novamente.';
          this.authService.logout();
        } else {
          this.errorMessage =
            error.error?.message || 'Erro ao atualizar perfil';
        }
      },
    });
  }
}
