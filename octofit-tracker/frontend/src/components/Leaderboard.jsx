import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchEndpoint } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchEndpoint(`${API_BASE_URL}/api/leaderboard/`)
      .then((items) => setEntries(items))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Points / 04</p>
          <h1>Make your mark.</h1>
          <p className="intro">Celebrate progress, not perfection. Every point tells a story.</p>
        </div>
        <span className="metric-badge">TOP {Math.min(entries.length, 3).toString().padStart(2, '0')}</span>
      </div>
      {state.loading && <p className="feedback">Loading leaderboard...</p>}
      {state.error && <p className="feedback feedback-error">{state.error}</p>}
      {!state.loading && !state.error && entries.length === 0 && <p className="feedback">No scores yet.</p>}
      <div className="leaderboard-list">
        {entries.map((entry, index) => (
          <article className={`leaderboard-row rank-${entry.rank || index + 1}`} key={entry._id || entry.id || index}>
            <span className="rank-number">{String(entry.rank || index + 1).padStart(2, '0')}</span>
            <div className="leader-name">
              <strong>{entry.user?.displayName || entry.user?.username || 'Unknown athlete'}</strong>
              <span>{entry.team?.name || 'Independent'}</span>
            </div>
            <strong className="leader-points">{entry.points || 0}<small> PTS</small></strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard