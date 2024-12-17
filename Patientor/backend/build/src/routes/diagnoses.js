"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const diagnosesRouter = express_1.default.Router();
console.log('Diagnoses Router Initialized');
diagnosesRouter.get('/', (_req, res) => {
    console.log('GET /api/diagnoses called');
    const diagnoses = diagnosesService_1.default.getEntries();
    res.json(diagnoses);
});
diagnosesRouter.post('/', (_req, res) => {
    res.send('Saving diagnoses!');
});
exports.default = diagnosesRouter;
