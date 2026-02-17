const Home = () => {
  return (
    <section className="panel">
      <div className="hero">
        <div>
          <p className="eyebrow">React.lazy + Suspense</p>
          <h1>Ship less JavaScript, load only what matters.</h1>
          <p className="lead">
            This experiment showcases component lazy loading to reduce initial
            bundle size and keep the first paint fast.
          </p>
          <div className="cta-row">
            <button className="primary">Start Measuring</button>
            <button className="ghost">View Network</button>
          </div>
        </div>
        <div className="metrics">
          <div className="metric-card">
            <p className="metric-label">Initial JS</p>
            <p className="metric-value">-38%</p>
            <p className="metric-note">Deferred route chunks</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">TTI</p>
            <p className="metric-value">1.9s</p>
            <p className="metric-note">Suspense fallback shown</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">Routes</p>
            <p className="metric-value">3</p>
            <p className="metric-note">Loaded on demand</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
