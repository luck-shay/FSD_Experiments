import { Suspense, lazy } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const Home = lazy(() => import('./pages/Home.jsx'))
const Features = lazy(() => import('./pages/Features.jsx'))
const Insights = lazy(() => import('./pages/Insights.jsx'))

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="brand-title">Lazy Labs</p>
            <p className="brand-sub">Unit-5 performance studio</p>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/features" className={({ isActive }) => (isActive ? 'active' : '')}>
            Features
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => (isActive ? 'active' : '')}>
            Insights
          </NavLink>
        </nav>
      </header>

      <main className="content">
        <Suspense
          fallback={
            <div className="loader">
              <div className="loader-bar" />
              <p>Loading the next section...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
