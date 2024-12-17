import axios from 'axios';
import { DiagnosesEntry } from '../types';
import { apiBaseUrl } from '../constants';

const baseUrl = `${apiBaseUrl}/diagnoses`;

const getAll = async (): Promise<DiagnosesEntry[]> => {
  const response = await axios.get<DiagnosesEntry[]>(baseUrl);
  return response.data;
};

export default {
  getAll,
};
