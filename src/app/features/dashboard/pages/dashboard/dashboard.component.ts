// dashboard.component.ts
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditRecordDialogComponent } from '../components/edit-record-dialog/edit-record-dialog.component';
import { PressureService } from '../../../../core/services/pressure.service';
import { GlucoseService } from '../../../../core/services/glucose.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface HealthRecord {
  id?: string;
  date: Date;
  systolic: number;
  diastolic: number;
  glucose: number;
  heartRate?: number;
  measurementTime?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    DatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  newRecord: HealthRecord = {
    date: new Date(),
    systolic: 0,
    diastolic: 0,
    glucose: 0,
  };

  records: HealthRecord[] = [];
  displayedColumns: string[] = [
    'date',
    'systolic',
    'diastolic',
    'glucose',
    'actions',
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private pressureService: PressureService,
    private glucoseService: GlucoseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  async addRecord() {
    if (
      this.newRecord.systolic <= 0 ||
      this.newRecord.diastolic <= 0 ||
      this.newRecord.glucose <= 0
    ) {
      this.showError(
        'Por favor, insira valores válidos para pressão e glicose'
      );
      return;
    }

    try {
      // Criar registro de pressão
      const pressureData = {
        systolic: this.newRecord.systolic,
        diastolic: this.newRecord.diastolic,
        heartRate: 0, // Você pode adicionar um campo para isso no formulário
        measurementTime: this.newRecord.date.toISOString(),
      };

      // Criar registro de glicose
      const glucoseData = {
        glucose: this.newRecord.glucose,
        measurementTime: this.newRecord.date.toISOString(),
      };

      // Enviar ambos em paralelo
      const [pressureResponse, glucoseResponse] = await Promise.all([
        this.pressureService.createPressure(pressureData).toPromise(),
        this.glucoseService.createGlucose(glucoseData).toPromise(),
      ]);

      this.showSuccess('Registros adicionados com sucesso');
      this.resetForm();
      this.loadRecords();
    } catch (error) {
      this.showError('Erro ao adicionar registros');
      console.error('Error adding records:', error);
    }
  }

  resetForm() {
    this.newRecord = {
      date: new Date(),
      systolic: 0,
      diastolic: 0,
      glucose: 0,
    };
  }

  editRecord(record: HealthRecord, index: number) {
    const dialogRef = this.dialog.open(EditRecordDialogComponent, {
      width: '500px',
      data: { ...record },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          // Atualizar pressão
          const pressureData = {
            systolic: result.systolic,
            diastolic: result.diastolic,
            heartRate: 0, // Você pode adicionar um campo para isso no formulário
            measurementTime: result.date.toISOString(),
          };

          // Atualizar glicose
          const glucoseData = {
            glucose: result.glucose,
            measurementTime: result.date.toISOString(),
          };

          // Enviar ambos em paralelo
          await Promise.all([
            this.pressureService
              .updatePressure(result.id, pressureData)
              .toPromise(),
            this.glucoseService
              .updateGlucose(result.id, glucoseData)
              .toPromise(),
          ]);

          this.showSuccess('Registros atualizados com sucesso');
          this.loadRecords();
        } catch (error) {
          this.showError('Erro ao atualizar registros');
          console.error('Error updating records:', error);
        }
      }
    });
  }

  async deleteRecord(index: number) {
    const record = this.records[index];
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      try {
        await Promise.all([
          this.pressureService.deletePressure(record.id!).toPromise(),
          this.glucoseService.deleteGlucose(record.id!).toPromise(),
        ]);

        this.showSuccess('Registros excluídos com sucesso');
        this.loadRecords();
      } catch (error) {
        this.showError('Erro ao excluir registros');
        console.error('Error deleting records:', error);
      }
    }
  }

  async loadRecords() {
    try {
      // Obter pressões
      const pressures = await this.pressureService
        .getAllPressures()
        .toPromise();

      // Obter glicoses
      const glucoses = await this.glucoseService.getAllGlucose().toPromise();

      // Combinar os dados (simplificado - você pode precisar de uma lógica mais sofisticada)
      this.records = pressures.map((pressure: any) => {
        const glucose = glucoses.find(
          (g: any) =>
            new Date(g.measurementTime).getTime() ===
            new Date(pressure.measurementTime).getTime()
        );

        return {
          id: pressure.idPressure,
          date: new Date(pressure.measurementTime),
          systolic: pressure.systolic,
          diastolic: pressure.diastolic,
          glucose: glucose ? glucose.glucose : 0,
          heartRate: pressure.heartRate,
        };
      });

      // Ordenar por data
      this.records.sort((a, b) => b.date.getTime() - a.date.getTime());

      this.cdr.detectChanges();
    } catch (error) {
      this.showError('Erro ao carregar registros');
      console.error('Error loading records:', error);
    }
  }

  getWeeklyRecords(): HealthRecord[] {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.records.filter((record) => new Date(record.date) >= oneWeekAgo);
  }

  getMonthlyRecords(): HealthRecord[] {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return this.records.filter(
      (record) => new Date(record.date) >= oneMonthAgo
    );
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
