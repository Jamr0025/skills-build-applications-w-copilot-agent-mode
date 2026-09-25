import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workouts/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load workouts (${response.status})`)
        return response.json()
      })
      .then((payload) => setWorkouts(normalizeCollection(payload)))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Plans / 05</p>
          <h1>Find your next win.</h1>
          <p className="intro">Simple, adaptable sessions for wherever your energy is today.</p>
        </div>
        <span className="metric-badge">{workouts.length.toString().padStart(2, '0')} PLANS</span>
      </div>
      {state.loading && <p className="feedback">Loading workouts...</p>}
      {state.error && <p className="feedback feedback-error">{state.error}</p>}
      {!state.loading && !state.error && workouts.length === 0 && <p className="feedback">No workouts available.</p>}
      <div className="workout-grid">
        {workouts.map((workout, index) => (
          <article className="workout-card" key={workout._id || workout.id || workout.title || index}>
            <div className="workout-number">0{index + 1}</div>
            <span className="workout-type">{workout.type || 'training'} / {workout.difficulty || 'all levels'}</span>
            <h2>{workout.title || 'Workout plan'}</h2>
            <p>{workout.description || 'A balanced session to keep your momentum going.'}</p>
            <footer><span>{workout.durationMinutes || 0} minutes</span><span aria-hidden="true">↗</span></footer>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts