import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'HealthTrack - Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        title: 'HealthTrack - Perfil',
        component: ProfileComponent,
      },
    ],
  },
];
