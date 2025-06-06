import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlucoseService {
  constructor(private api: ApiService) {}

  getAllGlucose(): Observable<any> {
    return this.api.get('/glucose');
  }

  getGlucoseById(id: string): Observable<any> {
    return this.api.get(`/glucose/${id}`);
  }

  createGlucose(glucoseData: any): Observable<any> {
    return this.api.post('/glucose', glucoseData);
  }

  updateGlucose(id: string, glucoseData: any): Observable<any> {
    return this.api.put('/glucose', id, glucoseData);
  }

  deleteGlucose(id: string): Observable<any> {
    return this.api.delete('/glucose', id);
  }

  getGlucoseByDate(initialDate: string, endDate: string): Observable<any> {
    return this.api.getByDate('/glucose', initialDate, endDate);
  }
}
