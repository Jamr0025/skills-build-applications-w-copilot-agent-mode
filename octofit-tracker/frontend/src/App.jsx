import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/users', label: 'Athletes', meta: 'People' },
  { to: '/activities', label: 'Activities', meta: 'Movement' },
  { to: '/teams', label: 'Teams', meta: 'Crew' },
  { to: '/leaderboard', label: 'Leaderboard', meta: 'Points' },
  { to: '/workouts', label: 'Workouts', meta: 'Plans' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/users" end>
          <span className="brand-mark">OF</span>
          <span>
            <strong>OctoFit</strong>
            <small>TRACKER / MERGINGTON</small>
          </span>
        </NavLink>
        <div className="header-status">
          <span className="status-dot" />
          LIVE TRAINING HUB
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar" aria-label="Main navigation">
          <p className="eyebrow">Explore</p>
          <nav className="nav-list">
            {navigation.map((item) => (
              <NavLink className="nav-link" to={item.to} key={item.to}>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-note">
            <span className="note-label">WEEKLY FOCUS</span>
            <strong>Consistency over intensity.</strong>
            <span>Every session counts toward the crew.</span>
          </div>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/users" />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
