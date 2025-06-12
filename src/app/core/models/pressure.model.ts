export interface Pressure {
  id: number;
  systolic: number;
  diastolic: number;
  heartbeat: number;
  measurementTime: string;
}

export interface PressureRegistrationDTO {
  systolic: number;
  diastolic: number;
  heartbeat: number;
  measurementTime: string;
}

export interface PressureResponseDTO {
  id: number;
  systolic: number;
  diastolic: number;
  heartbeat: number;
  measurementTime: string;
}
