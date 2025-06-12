import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  BloodGlucoseRegistrationDTO,
  BloodGlucoseResponseDTO,
} from '../models/glucose.model';

@Injectable({
  providedIn: 'root',
})
export class GlucoseService {
  constructor(private api: ApiService) {}

  registerGlucose(data: BloodGlucoseRegistrationDTO) {
    return this.api.post('glucose', data);
  }

  getGlucoseById(id: number) {
    return this.api.get(`glucose/${id}`);
  }

  getAllGlucose() {
    return this.api.get('glucose');
  }

  updateGlucose(id: number, data: BloodGlucoseRegistrationDTO) {
    return this.api.put(`glucose/${id}`, data);
  }

  deleteGlucose(id: number) {
    return this.api.delete(`glucose/${id}`);
  }

  getGlucoseByDate(initialDate: string, endDate: string) {
    return this.api.get(
      `glucose/find-by-date?initialDate=${initialDate}&endDate=${endDate}`
    );
  }
}
