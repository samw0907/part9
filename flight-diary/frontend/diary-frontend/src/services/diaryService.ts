import axios from 'axios'
import { DiaryEntry } from '../types'

const apiUrl = 'http://localhost:3000/api/diaries'

export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(apiUrl)
  return response.data
}

export const addDiaryEntry = async (newDiary: DiaryEntry): Promise<void> => {
  await axios.post(apiUrl, newDiary)
}
