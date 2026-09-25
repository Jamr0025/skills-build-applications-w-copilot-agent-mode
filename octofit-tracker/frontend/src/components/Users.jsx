import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(usersEndpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load users (${response.status})`)
        return response.json()
      })
      .then((payload) => setUsers(normalizeCollection(payload)))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Community / 01</p>
          <h1>Meet the athletes.</h1>
          <p className="intro">A snapshot of the students building stronger habits together.</p>
        </div>
        <span className="metric-badge">{users.length.toString().padStart(2, '0')} ACTIVE</span>
      </div>
      {state.loading && <p className="feedback">Loading athletes...</p>}
      {state.error && <p className="feedback feedback-error">{state.error}</p>}
      {!state.loading && !state.error && users.length === 0 && <p className="feedback">No athletes yet.</p>}
      <div className="athlete-grid">
        {users.map((user, index) => (
          <article className="athlete-card" key={user._id || user.id || user.username || index}>
            <span className="card-index">0{index + 1}</span>
            <div className="avatar">{(user.displayName || user.username || '?').slice(0, 2).toUpperCase()}</div>
            <h2>{user.displayName || user.username}</h2>
            <p>@{user.username || 'athlete'}</p>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users