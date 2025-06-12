export interface BloodGlucose {
  id: number;
  glucoseValue: number;
  measurementTime: string;
  context: string;
}

export interface BloodGlucoseRegistrationDTO {
  glucoseValue: number;
  measurementTime: string;
  context: string;
}

export interface BloodGlucoseResponseDTO {
  id: number;
  glucoseValue: number;
  measurementTime: string;
  context: string;
}
