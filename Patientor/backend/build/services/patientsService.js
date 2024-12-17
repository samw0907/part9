"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientById = (id) => {
    return patients.find((patient) => patient.id === id);
};
const addPatient = (entry) => {
    const newPatient = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)(), entries: [] });
    patients.push(newPatient);
    return newPatient;
};
const addEntryToPatient = (id, entry) => {
    const patient = getPatientById(id);
    if (!patient) {
        return undefined;
    }
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getNonSensitiveEntries,
    getPatientById,
    addPatient,
    addEntryToPatient,
};
