import data from '../data/diagnoses';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = data;

const getEntries = (): DiagnosesEntry[] => {
    return diagnoses;
  };

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses
};