import { useEffect, useState } from 'react'
import { getDiaryEntries } from '../services/diaryService'
import { DiaryEntry } from '../types'

const DiaryList = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const fetchedDiaries = await getDiaryEntries()
        setDiaries(fetchedDiaries)
      } catch (error) {
        console.error('Error fetching diaries:', error)
      }
    };

    fetchDiaries()
  }, [])

  return (
    <div>
      <h2>Diary Entries</h2>
        <div>
          {diaries.map((diary) => (
            <div key={diary.id}>
              <h3>{diary.date}</h3>
              <p>Visibility: {diary.visibility}</p>
              <p>Weather: {diary.weather}</p>
              <p>Comments: {diary.comment}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default DiaryList;
