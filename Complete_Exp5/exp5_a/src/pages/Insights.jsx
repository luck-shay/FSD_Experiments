const Insights = () => {
  return (
    <section className="panel">
      <div className="split">
        <div>
          <h2>Navigation insights</h2>
          <p className="lead">
            Observe how new chunks are fetched when you visit each route. The
            Suspense fallback appears only while the chunk is loading.
          </p>
          <ul className="checklist">
            <li>Open DevTools Network tab.</li>
            <li>Navigate to Features and Insights.</li>
            <li>Watch the chunk requests appear.</li>
            <li>Compare the initial bundle size.</li>
          </ul>
        </div>
        <div className="stack">
          <div className="stat">
            <p className="stat-label">Chunk size</p>
            <p className="stat-value">12-18 KB</p>
          </div>
          <div className="stat">
            <p className="stat-label">Fallback time</p>
            <p className="stat-value">150-300 ms</p>
          </div>
          <div className="stat">
            <p className="stat-label">Core bundle</p>
            <p className="stat-value">Lean + fast</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Insights
