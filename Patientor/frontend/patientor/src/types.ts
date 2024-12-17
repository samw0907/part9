export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface HospitalEntry {
  id: string;
  date: string;
  type: "Hospital";
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry {
  id: string;
  date: string;
  type: "OccupationalHealthcare";
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry {
  id: string;
  date: string;
  type: "HealthCheck";
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  healthCheckRating: 0 | 1 | 2 | 3;
}

export interface Patient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
  id: string;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type UnionOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
