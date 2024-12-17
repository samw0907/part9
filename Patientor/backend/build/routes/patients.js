"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.patientsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const patientsRouter = express_1.default.Router();
exports.patientsRouter = patientsRouter;
console.log("Patients Router Initialized");
// Middleware for parsing new patient entries
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
// Middleware for handling errors
const errorMiddleware = (_error, _req, res, next) => {
    if (_error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: _error.issues });
    }
    else {
        next(_error);
    }
};
exports.errorMiddleware = errorMiddleware;
// Fetch all patients (non-sensitive data)
patientsRouter.get("/", (_req, res) => {
    const patients = patientsService_1.default.getNonSensitiveEntries();
    res.json(patients);
});
// Fetch all entries for a specific patient
patientsRouter.get("/:id/entries", (req, res) => {
    const { id } = req.params;
    const patient = patientsService_1.default.getPatientById(id);
    if (!patient) {
        res.status(404).send({ error: "Patient not found" });
        return;
    }
    res.json(patient.entries);
});
// Fetch a specific patient
patientsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const patient = patientsService_1.default.getPatientById(id);
    if (!patient) {
        res.status(404).send({ error: "Patient not found" });
        return;
    }
    res.json(patient);
});
// Add a new patient
patientsRouter.post("/", newPatientParser, (req, res) => {
    const newPatientEntry = req.body;
    const addedPatient = patientsService_1.default.addPatient(newPatientEntry);
    res.json(addedPatient);
});
// Add a new entry to a specific patient
patientsRouter.post("/:id/entries", (req, res) => {
    const { id } = req.params;
    try {
        const newEntry = (0, utils_1.parseNewEntry)(req.body);
        const addedEntry = patientsService_1.default.addEntryToPatient(id, newEntry);
        if (!addedEntry) {
            res.status(404).send({ error: "Patient not found" });
            return;
        }
        res.json(addedEntry);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).send({ error: error.issues });
        }
        else {
            res.status(400).send({ error: "Invalid entry data" });
        }
    }
});
// Error handling middleware
patientsRouter.use(errorMiddleware);
