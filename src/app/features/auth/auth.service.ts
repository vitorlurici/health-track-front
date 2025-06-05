import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
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
          this.setSession(response, keepConnected);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
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
    const expiresIn = keepConnected ? '7d' : '1d';
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
