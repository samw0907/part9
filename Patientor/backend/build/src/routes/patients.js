"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const patientsRouter = express_1.default.Router();
console.log('Patients Router Initialized');
patientsRouter.get('/', (_req, res) => {
    console.log('GET /api/patients called');
    const patients = patientsService_1.default.getNonSensitiveEntries();
    console.log(patients);
    res.json(patients);
});
patientsRouter.post('/', (_req, res) => {
    res.send('Saving patients!');
});
exports.default = patientsRouter;
