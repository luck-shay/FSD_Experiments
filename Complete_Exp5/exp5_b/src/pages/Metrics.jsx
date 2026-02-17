const Metrics = () => {
  return (
    <section className="panel">
      <div className="metrics">
        <div>
          <h2>Performance metrics</h2>
          <p className="lead">
            Lazy loading keeps the base bundle lean. The fallback UI keeps the
            experience responsive while chunks load.
          </p>
        </div>
        <div className="metric-list">
          <div>
            <p className="metric-label">Base bundle</p>
            <p className="metric-value">Small</p>
          </div>
          <div>
            <p className="metric-label">Route chunks</p>
            <p className="metric-value">Loaded on demand</p>
          </div>
          <div>
            <p className="metric-label">User feedback</p>
            <p className="metric-value">Instant</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Metrics
