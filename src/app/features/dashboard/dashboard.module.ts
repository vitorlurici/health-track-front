import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component'; 
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardPageComponent,
    RouterModule.forChild(dashboardRoutes),
    MatToolbarModule,
    MatCardModule,
  ],
})
export class DashboardModule {}
