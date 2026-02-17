import { Suspense, lazy } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const Overview = lazy(() => import('./pages/Overview.jsx'))
const RoutesLab = lazy(() => import('./pages/RoutesLab.jsx'))
const Metrics = lazy(() => import('./pages/Metrics.jsx'))

function App() {
  return (
    <div className="shell">
      <header className="header">
        <div className="badge">Exp-5</div>
        <div>
          <p className="title">Route-Based Lazy Loading</p>
          <p className="subtitle">SPA performance with on-demand chunks</p>
        </div>
        <nav className="menu">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Overview
          </NavLink>
          <NavLink to="/routes" className={({ isActive }) => (isActive ? 'active' : '')}>
            Routes Lab
          </NavLink>
          <NavLink to="/metrics" className={({ isActive }) => (isActive ? 'active' : '')}>
            Metrics
          </NavLink>
        </nav>
      </header>

      <Suspense
        fallback={
          <div className="fallback">
            <div className="pulse" />
            <p>Loading route chunk...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/routes" element={<RoutesLab />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
