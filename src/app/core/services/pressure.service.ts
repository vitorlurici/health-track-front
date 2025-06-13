import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pressure } from '../models/pressure.model';

@Injectable({
  providedIn: 'root',
})
export class PressureService {
  private apiUrl = `${environment.apiUrl}/pressure`;

  constructor(private http: HttpClient) {}

  registerPressure(pressure: Pressure): Observable<any> {
    return this.http.post(`${this.apiUrl}`, pressure);
  }

  getPressureByDate(initialDate: Date, endDate: Date): Observable<Pressure[]> {
    const formatDate = (date: Date) => date.toISOString().split('.')[0];

    return this.http.get<Pressure[]>(`${this.apiUrl}/find-by-date`, {
      params: {
        initialDate: formatDate(initialDate),
        endDate: formatDate(endDate),
      },
    });
  }

  getAllPressures(): Observable<Pressure[]> {
    return this.http.get<Pressure[]>(this.apiUrl);
  }
}
