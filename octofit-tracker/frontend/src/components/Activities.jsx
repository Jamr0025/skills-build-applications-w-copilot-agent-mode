import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'

const activityLabels = { running: 'Run', walking: 'Walk', strength: 'Strength' }
const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(activitiesEndpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load activities (${response.status})`)
        return response.json()
      })
      .then((payload) => setActivities(normalizeCollection(payload)))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Movement / 02</p>
          <h1>Keep moving.</h1>
          <p className="intro">Recent sessions, logged by the OctoFit community.</p>
        </div>
        <span className="metric-badge">{activities.reduce((total, item) => total + (item.points || 0), 0)} PTS</span>
      </div>
      {state.loading && <p className="feedback">Loading activities...</p>}
      {state.error && <p className="feedback feedback-error">{state.error}</p>}
      {!state.loading && !state.error && activities.length === 0 && <p className="feedback">No activities logged yet.</p>}
      <div className="activity-list">
        {activities.map((activity, index) => (
          <article className="activity-row" key={activity._id || activity.id || index}>
            <span className={`activity-icon activity-${activity.type}`}>{activity.type?.slice(0, 1).toUpperCase()}</span>
            <div className="activity-main">
              <strong>{activityLabels[activity.type] || activity.type || 'Activity'}</strong>
              <span>{activity.user?.displayName || activity.user?.username || 'OctoFit athlete'}</span>
            </div>
            <span className="activity-detail">{activity.durationMinutes || 0} min</span>
            <span className="activity-detail">{activity.distanceKm ? `${activity.distanceKm} km` : 'Strength'}</span>
            <strong className="activity-points">+{activity.points || 0}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities