import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";
import patientsService from "../services/patientsService";
import { NewPatientEntrySchema, parseNewEntry } from "../utils";
import { NewPatientEntry } from "../types";

const patientsRouter = express.Router();

console.log("Patients Router Initialized");

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  _error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (_error instanceof z.ZodError) {
    res.status(400).send({ error: _error.issues });
  } else {
    next(_error);
  }
};

patientsRouter.get("/", (_req: Request, res: Response) => {
  const patients = patientsService.getNonSensitiveEntries();
  res.json(patients);
});

patientsRouter.get("/:id/entries", (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = patientsService.getPatientById(id);

  if (!patient) {
    res.status(404).send({ error: "Patient not found" });
    return;
  }

  res.json(patient.entries);
});

patientsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = patientsService.getPatientById(id);

  if (!patient) {
    res.status(404).send({ error: "Patient not found" });
    return;
  }

  res.json(patient);
});

patientsRouter.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response) => {
    const newPatientEntry = req.body;
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  }
);

patientsRouter.post("/:id/entries", (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const newEntry = parseNewEntry(req.body);
    const addedEntry = patientsService.addEntryToPatient(id, newEntry);
    if (!addedEntry) {
      res.status(404).send({ error: "Patient not found" });
      return;
    }
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "Invalid entry data" });
    }
  }
});

patientsRouter.use(errorMiddleware);

export { patientsRouter, errorMiddleware };
