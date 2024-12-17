import React, { useState } from 'react'
import { DiaryEntry } from '../types'
import { addDiaryEntry } from '../services/diaryService'

const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const
const visibilityOptions = ['great', 'good', 'ok', 'poor'] as const

const DiaryForm = () => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy'>('sunny')
  const [visibility, setVisibility] = useState<'great' | 'good' | 'ok' | 'poor'>('good')
  const [comment, setComment] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newDiary: DiaryEntry = {
      id: Date.now(),
      date,
      weather,
      visibility,
      comment,
    }

    try {
      await addDiaryEntry(newDiary)
      setDate('')
      setWeather('cloudy')
      setVisibility('ok')
      setComment('')
    } catch (error) {
      console.error('Error adding new diary entry:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Visibility:</label>
        <div>
          {visibilityOptions.map((option) => (
            <label key={option} >
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div>
      <div>
        <label>Weather:</label>
        <div>
          {weatherOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
        <label>Comment:</label>
        <input
        type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  )
}

export default DiaryForm;
