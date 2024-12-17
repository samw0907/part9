import data from "../data/patients";
import { Patient, Entry, EntryWithoutId } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = data;

const getNonSensitiveEntries = (): Omit<Patient, "ssn" | "entries">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: Omit<Patient, "id">): Patient => {
  const newPatient = {
    ...entry,
    id: uuid(),
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (id: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = getPatientById(id);
  if (!patient) {
    return undefined;
  }
  const newEntry: Entry = { id: uuid(), ...entry };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntryToPatient,
};
