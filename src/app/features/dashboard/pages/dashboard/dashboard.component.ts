import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { PressureRegisterComponent } from './components/pressure-register/pressure-register.component';
import { GlucoseRegisterComponent } from './components/glucose-register/glucose-register.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    PressureRegisterComponent,
    GlucoseRegisterComponent,
    ChartsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selectedTabIndex = 0;
}
