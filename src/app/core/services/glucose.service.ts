import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Glucose } from '../models/glucose.model';

@Injectable({
  providedIn: 'root',
})
export class GlucoseService {
  private apiUrl = `${environment.apiUrl}/glucose`;

  constructor(private http: HttpClient) {}

  registerGlucose(glucose: Glucose): Observable<any> {
    return this.http.post(`${this.apiUrl}`, glucose);
  }

  getGlucoseByDate(initialDate: Date, endDate: Date): Observable<Glucose[]> {
    const formatDate = (date: Date) => date.toISOString().split('.')[0];

    return this.http.get<Glucose[]>(`${this.apiUrl}/find-by-date`, {
      params: {
        initialDate: formatDate(initialDate),
        endDate: formatDate(endDate),
      },
    });
  }

  getAllGlucose(): Observable<Glucose[]> {
    return this.http.get<Glucose[]>(this.apiUrl);
  }
}
