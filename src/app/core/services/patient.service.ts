import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Patient {
  name: string;
  birth: string;
  phone: string;
  weight: number;
  height: number;
  cpf: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  updatePatient(patientData: Partial<Patient>): Observable<Patient> {
    return this.http.put<Patient>(this.apiUrl, patientData).pipe(
      catchError((error) => {
        console.error('Error updating patient:', error);
        throw error;
      })
    );
  }

  getPatient(): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}`);
  }
}
