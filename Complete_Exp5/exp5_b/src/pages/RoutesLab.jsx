const RoutesLab = () => {
  return (
    <section className="panel">
      <h2>Routes Lab</h2>
      <p className="lead">
        Observe the Network tab while navigating. Each route loads its own
        JavaScript chunk the first time you visit it.
      </p>
      <div className="steps">
        <div className="step">
          <span>1</span>
          <p>Open DevTools and switch to the Network tab.</p>
        </div>
        <div className="step">
          <span>2</span>
          <p>Click Routes Lab and Metrics to trigger chunk fetches.</p>
        </div>
        <div className="step">
          <span>3</span>
          <p>Compare the initial bundle size with later chunks.</p>
        </div>
      </div>
    </section>
  )
}

export default RoutesLab
