const Overview = () => {
  return (
    <section className="panel">
      <div className="hero">
        <div>
          <p className="kicker">Aim</p>
          <h1>Load routes only when they are needed.</h1>
          <p className="lead">
            Each page is split into its own chunk using React.lazy. Navigation
            triggers downloads on demand, cutting the initial bundle size.
          </p>
          <div className="chips">
            <span>React.lazy</span>
            <span>Suspense</span>
            <span>Route chunks</span>
          </div>
        </div>
        <div className="card-grid">
          <article>
            <h3>Initial load</h3>
            <p>Only the shell and current route ship first.</p>
          </article>
          <article>
            <h3>On navigation</h3>
            <p>Chunks download in parallel with a lightweight fallback.</p>
          </article>
          <article>
            <h3>Perceived speed</h3>
            <p>Users see immediate feedback while code streams in.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Overview
