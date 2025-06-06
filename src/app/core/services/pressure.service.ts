import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PressureService {
  constructor(private api: ApiService) {}

  getAllPressures(): Observable<any> {
    return this.api.get('/pressure');
  }

  getPressureById(id: string): Observable<any> {
    return this.api.get(`/pressure/${id}`);
  }

  createPressure(pressureData: any): Observable<any> {
    return this.api.post('/pressure', pressureData);
  }

  updatePressure(id: string, pressureData: any): Observable<any> {
    return this.api.put('/pressure', id, pressureData);
  }

  deletePressure(id: string): Observable<any> {
    return this.api.delete('/pressure', id);
  }

  getPressuresByDate(initialDate: string, endDate: string): Observable<any> {
    return this.api.getByDate('/pressure', initialDate, endDate);
  }
}
