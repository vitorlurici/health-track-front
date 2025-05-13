import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        title: 'HealthTrack - Login',
        component: AuthComponent,
        data: { activeButton: 1 },
      },
      {
        path: 'register',
        title: 'HealthTrack - Cadastro',
        component: AuthComponent,
        data: { activeButton: 2 },
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
