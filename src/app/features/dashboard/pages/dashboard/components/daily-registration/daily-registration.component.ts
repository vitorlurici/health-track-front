import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlucoseService } from '../../../../../../core/services/glucose.service';
import { PressureService } from '../../../../../../core/services/pressure.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BloodGlucoseRegistrationDTO } from '../../../../../../core/models/glucose.model';
import { PressureRegistrationDTO } from '../../../../../../core/models/pressure.model';

@Component({
  selector: 'app-daily-registration',
  templateUrl: './daily-registration.component.html',
  styleUrls: ['./daily-registration.component.scss'],
})
export class DailyRegistrationComponent {
  glucoseForm: FormGroup;
  pressureForm: FormGroup;
  activeTab: 'glucose' | 'pressure' = 'glucose';

  constructor(
    private fb: FormBuilder,
    private glucoseService: GlucoseService,
    private pressureService: PressureService,
    private snackBar: MatSnackBar
  ) {
    this.glucoseForm = this.fb.group({
      glucoseValue: [
        '',
        [Validators.required, Validators.min(30), Validators.max(500)],
      ],
      measurementTime: ['', Validators.required],
      context: ['', Validators.required],
    });

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
      measurementTime: ['', Validators.required],
    });
  }

  registerGlucose() {
    if (this.glucoseForm.valid) {
      const glucoseData: BloodGlucoseRegistrationDTO = this.glucoseForm.value;
      this.glucoseService.registerGlucose(glucoseData).subscribe({
        next: () => {
          this.snackBar.open('Glicose registrada com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.glucoseForm.reset();
        },
        error: (err) => {
          this.snackBar.open('Erro ao registrar glicose', 'Fechar', {
            duration: 3000,
          });
          console.error(err);
        },
      });
    }
  }

  registerPressure() {
    if (this.pressureForm.valid) {
      const pressureData: PressureRegistrationDTO = this.pressureForm.value;
      this.pressureService.registerPressure(pressureData).subscribe({
        next: () => {
          this.snackBar.open('Pressão registrada com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.pressureForm.reset();
        },
        error: (err) => {
          this.snackBar.open('Erro ao registrar pressão', 'Fechar', {
            duration: 3000,
          });
          console.error(err);
        },
      });
    }
  }
}
