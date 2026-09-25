import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load teams (${response.status})`)
        return response.json()
      })
      .then((payload) => setTeams(normalizeCollection(payload)))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Crew / 03</p>
          <h1>Stronger together.</h1>
          <p className="intro">Small teams. Shared momentum. A little friendly pressure.</p>
        </div>
        <span className="metric-badge">{teams.length.toString().padStart(2, '0')} CREWS</span>
      </div>
      {state.loading && <p className="feedback">Loading teams...</p>}
      {state.error && <p className="feedback feedback-error">{state.error}</p>}
      {!state.loading && !state.error && teams.length === 0 && <p className="feedback">No teams yet.</p>}
      <div className="team-grid">
        {teams.map((team, index) => (
          <article className="team-card" key={team._id || team.id || team.name || index}>
            <div className="team-card-top"><span>TEAM 0{index + 1}</span><span>→</span></div>
            <h2>{team.name || 'Unnamed team'}</h2>
            <p>{team.members?.length || 0} members</p>
            <div className="member-stack">
              {(team.members || []).slice(0, 4).map((member, memberIndex) => (
                <span className="mini-avatar" key={member._id || member.id || memberIndex}>
                  {(member.displayName || member.username || '?').slice(0, 1).toUpperCase()}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams