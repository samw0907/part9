import { z } from "zod";
import { Gender, EntryWithoutId } from "./types";

const NewPatientEntrySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date of birth",
  }),
  ssn: z.string().min(1, { message: "SSN is required" }),
  gender: z.nativeEnum(Gender, { errorMap: () => ({ message: "Invalid gender" }) }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  entries: z.array(z.object({})),
});

const HospitalEntrySchema = z.object({
  date: z.string(),
  type: z.literal("Hospital"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = z.object({
  date: z.string(),
  type: z.literal("OccupationalHealthcare"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const HealthCheckEntrySchema = z.object({
  date: z.string(),
  type: z.literal("HealthCheck"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  description: z.string(),
  healthCheckRating: z.number().min(0).max(3),
});

const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

const parseNewEntry = (object: unknown): EntryWithoutId => {
  const parsedEntry = EntrySchema.parse(object);

  // Ensure `diagnosisCodes` is an array if provided
  return {
    ...parsedEntry,
    diagnosisCodes: parsedEntry.diagnosisCodes || [],
  };
};

export { NewPatientEntrySchema, parseNewEntry };
