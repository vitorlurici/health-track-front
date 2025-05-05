import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        title: 'Login',
        component: AuthComponent,
        data: { activeButton: 1 },
      },
      {
        path: 'register',
        title: 'Cadastro',
        component: AuthComponent,
        data: { activeButton: 2 },
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
