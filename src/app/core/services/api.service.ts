import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Métodos genéricos para todas as requisições
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, body, {
      headers: this.getHeaders(),
    });
  }

  put(endpoint: string, id: string, body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${endpoint}/${id}`, body, {
      headers: this.getHeaders(),
    });
  }

  delete(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${endpoint}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getByDate(
    endpoint: string,
    initialDate: string,
    endDate: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${endpoint}/find-by-date?initialDate=${initialDate}&endDate=${endDate}`,
      { headers: this.getHeaders() }
    );
  }
}
