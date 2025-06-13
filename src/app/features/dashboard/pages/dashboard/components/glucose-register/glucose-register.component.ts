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
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { GlucoseService } from '../../../../../../core/services/glucose.service';
import {
  Glucose,
  MeasurementContext,
} from '../../../../../../core/models/glucose.model';

@Component({
  selector: 'app-glucose-register',
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
    MatSelectModule,
  ],
  templateUrl: './glucose-register.component.html',
  styleUrls: ['./glucose-register.component.scss'],
})
export class GlucoseRegisterComponent {
  glucoseForm: FormGroup;
  measurementContexts = Object.values(MeasurementContext);

  constructor(private fb: FormBuilder, private glucoseService: GlucoseService) {
    this.glucoseForm = this.fb.group({
      glucoseValue: [
        '',
        [Validators.required, Validators.min(30), Validators.max(500)],
      ],
      context: ['', Validators.required],
      measurementTime: [new Date(), Validators.required],
    });
  }

  onSubmit() {
    if (this.glucoseForm.valid) {
      const glucoseData: Glucose = {
        glucoseValue: this.glucoseForm.value.glucoseValue,
        context: this.glucoseForm.value.context,
        measurementTime: this.glucoseForm.value.measurementTime,
      };

      this.glucoseService.registerGlucose(glucoseData).subscribe({
        next: (response) => {
          console.log('Glucose registered:', response);
          this.glucoseForm.reset({
            measurementTime: new Date(),
          });
        },
        error: (error) => {
          console.error('Error registering glucose:', error);
        },
      });
    }
  }
}
