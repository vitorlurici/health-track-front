import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PressureService } from '../../../../../../core/services/pressure.service';
import { GlucoseService } from '../../../../../../core//services/glucose.service';
import { Pressure } from '../../../../../../core//models/pressure.model';
import { Glucose } from '../../../../../../core//models/glucose.model';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    BaseChartDirective, // Importamos o BaseChartDirective diretamente
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  pressureData: Pressure[] = [];
  glucoseData: Glucose[] = [];
  selectedTimeRange: 'week' | 'month' | 'all' = 'week';

  // Pressure Chart Configuration
  pressureChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };
  pressureChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Glucose Chart Configuration
  glucoseChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };
  glucoseChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  constructor(
    private pressureService: PressureService,
    private glucoseService: GlucoseService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const now = new Date();
    let initialDate: Date;

    switch (this.selectedTimeRange) {
      case 'week':
        initialDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        break;
      case 'month':
        initialDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case 'all':
        initialDate = new Date(0); // Very old date to get all records
        break;
    }

    // Load pressure data
    this.pressureService
      .getPressureByDate(initialDate, now)
      .subscribe((data) => {
        this.pressureData = data;
        this.updatePressureChart();
      });

    // Load glucose data
    this.glucoseService.getGlucoseByDate(initialDate, now).subscribe((data) => {
      this.glucoseData = data;
      this.updateGlucoseChart();
    });
  }

  updatePressureChart() {
    this.pressureChartData = {
      labels: this.pressureData.map((p) =>
        new Date(p.measurementTime).toLocaleDateString()
      ),
      datasets: [
        {
          data: this.pressureData.map((p) => p.systolic),
          label: 'Sistólica (mmHg)',
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          tension: 0.1,
        },
        {
          data: this.pressureData.map((p) => p.diastolic),
          label: 'Diastólica (mmHg)',
          borderColor: '#ff4081',
          backgroundColor: 'rgba(255, 64, 129, 0.1)',
          tension: 0.1,
        },
      ],
    };
  }

  updateGlucoseChart() {
    this.glucoseChartData = {
      labels: this.glucoseData.map((g) =>
        new Date(g.measurementTime).toLocaleDateString()
      ),
      datasets: [
        {
          data: this.glucoseData.map((g) => g.glucoseValue),
          label: 'Glicose (mg/dL)',
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.1,
        },
      ],
    };
  }

  onTimeRangeChange(range: 'week' | 'month' | 'all') {
    this.selectedTimeRange = range;
    this.loadData();
  }
}
