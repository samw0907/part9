"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNewEntry = exports.NewPatientEntrySchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
const NewPatientEntrySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    dateOfBirth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date of birth",
    }),
    ssn: zod_1.z.string().min(1, { message: "SSN is required" }),
    gender: zod_1.z.nativeEnum(types_1.Gender, { errorMap: () => ({ message: "Invalid gender" }) }),
    occupation: zod_1.z.string().min(1, { message: "Occupation is required" }),
    entries: zod_1.z.array(zod_1.z.object({})),
});
exports.NewPatientEntrySchema = NewPatientEntrySchema;
const HospitalEntrySchema = zod_1.z.object({
    date: zod_1.z.string(),
    type: zod_1.z.literal("Hospital"),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z.string(),
    discharge: zod_1.z.object({
        date: zod_1.z.string(),
        criteria: zod_1.z.string(),
    }),
});
const OccupationalHealthcareEntrySchema = zod_1.z.object({
    date: zod_1.z.string(),
    type: zod_1.z.literal("OccupationalHealthcare"),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z.string(),
    employerName: zod_1.z.string(),
    sickLeave: zod_1.z
        .object({
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
    })
        .optional(),
});
const HealthCheckEntrySchema = zod_1.z.object({
    date: zod_1.z.string(),
    type: zod_1.z.literal("HealthCheck"),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z.string(),
    healthCheckRating: zod_1.z.number().min(0).max(3),
});
const EntrySchema = zod_1.z.union([
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
    HealthCheckEntrySchema,
]);
const parseNewEntry = (object) => {
    const parsedEntry = EntrySchema.parse(object);
    // Ensure `diagnosisCodes` is an array if provided
    return Object.assign(Object.assign({}, parsedEntry), { diagnosisCodes: parsedEntry.diagnosisCodes || [] });
};
exports.parseNewEntry = parseNewEntry;
