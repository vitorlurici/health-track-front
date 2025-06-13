export enum MeasurementContext {
  FASTING = 'JEJUM',
  PRE_PRANDIAL = 'PRÉ-PRANDIAL',
  POST_PRANDIAL = 'PÓS-PRANDIAL',
  BEFORE_SLEEP = 'ANTES DE DORMIR',
  OTHER = 'OUTRO',
}

export interface Glucose {
  id?: number;
  glucoseValue: number;
  context: MeasurementContext;
  measurementTime: Date;
}
