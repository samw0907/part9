export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
  }

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  }

export interface Entry {
  id: string;
  date: string;
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck"
  specialist: string;
  diagnosisCodes: string[];
  description: string;
  }

export interface Patient {
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[],
    id: string;
}

export interface OccupationalHealthcareEntry extends Entry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends Entry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}


export interface HealthCheckEntry extends Entry {
  type: "HealthCheck";
  healthCheckRating: 0 | 1 | 2 | 3;
}

export type EntryType = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type UnionOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, "id">;