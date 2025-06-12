import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  PressureRegistrationDTO,
  PressureResponseDTO,
} from '../models/pressure.model';

@Injectable({
  providedIn: 'root',
})
export class PressureService {
  constructor(private api: ApiService) {}

  registerPressure(data: PressureRegistrationDTO) {
    return this.api.post('pressure', data);
  }

  getPressureById(id: number) {
    return this.api.get(`pressure/${id}`);
  }

  getAllPressure() {
    return this.api.get('pressure');
  }

  updatePressure(id: number, data: PressureRegistrationDTO) {
    return this.api.put(`pressure/${id}`, data);
  }

  deletePressure(id: number) {
    return this.api.delete(`pressure/${id}`);
  }

  getPressureByDate(initialDate: string, endDate: string) {
    return this.api.get(
      `pressure/find-by-date?initialDate=${initialDate}&endDate=${endDate}`
    );
  }
}
