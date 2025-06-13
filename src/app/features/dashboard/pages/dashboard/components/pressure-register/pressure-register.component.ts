import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { PressureService } from '../../../../../../core/services/pressure.service';
import { Pressure } from '../../../../../../core/models/pressure.model';

@Component({
  selector: 'app-pressure-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './pressure-register.component.html',
  styleUrls: ['./pressure-register.component.scss'],
})
export class PressureRegisterComponent {
  pressureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pressureService: PressureService
  ) {
    this.pressureForm = this.fb.group({
      systolic: [
        '',
        [Validators.required, Validators.min(50), Validators.max(250)],
      ],
      diastolic: [
        '',
        [Validators.required, Validators.min(30), Validators.max(150)],
      ],
      heartbeat: [
        '',
        [Validators.required, Validators.min(30), Validators.max(200)],
      ],
      measurementTime: [new Date(), Validators.required],
    });
  }

  onSubmit() {
    if (this.pressureForm.valid) {
      const pressureData: Pressure = {
        systolic: this.pressureForm.value.systolic,
        diastolic: this.pressureForm.value.diastolic,
        heartbeat: this.pressureForm.value.heartbeat,
        measurementTime: this.pressureForm.value.measurementTime,
      };

      this.pressureService.registerPressure(pressureData).subscribe({
        next: (response) => {
          console.log('Pressure registered:', response);
          this.pressureForm.reset({
            measurementTime: new Date(),
          });
        },
        error: (error) => {
          console.error('Error registering pressure:', error);
        },
      });
    }
  }
}
