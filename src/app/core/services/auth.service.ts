import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
  created: string;
  expiration: string;
  username: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    weight: number;
    height: number;
    cpf: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = `${environment.apiUrl}/patients`;
  private loginUrl = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(
    email: string,
    password: string,
    keepConnected: boolean
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.loginUrl}/login`, {
        email,
        password,
        keepConnected,
      })
      .pipe(
        tap((response) => {
          if (this.isBrowser()) {
            console.log('Login response:', response);
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem(
              'user',
              JSON.stringify({
                ...response.user,
                email: response.username,
              })
            );
            console.log('Token stored:', localStorage.getItem('token'));
          }
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    phone: string,
    weight: number,
    height: number,
    birth: string,
    cpf: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.registerUrl}/register-patient`,
      {
        name,
        email,
        password,
        phone,
        weight,
        height,
        birth,
        cpf,
      }
    );
  }

  private setSession(authResult: AuthResponse, keepConnected: boolean): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', authResult.accessToken);
      localStorage.setItem('refreshToken', authResult.refreshToken);
      localStorage.setItem('user', JSON.stringify(authResult.user));
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isBrowser() ? !!localStorage.getItem('token') : false;
  }

  getCurrentUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = this.isBrowser()
      ? localStorage.getItem('refreshToken')
      : null;
    return this.http.post<{ accessToken: string }>(
      `${this.loginUrl}/refresh-token`,
      { refreshToken }
    );
  }
}
