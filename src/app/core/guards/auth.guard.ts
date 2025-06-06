import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    if (state.url.includes('/login') || state.url.includes('/register')) {
      return router.createUrlTree(['/dashboard']);
    }
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
