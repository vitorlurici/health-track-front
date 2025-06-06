import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './core/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'HealthTrack',
    component: LayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.AUTH_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
