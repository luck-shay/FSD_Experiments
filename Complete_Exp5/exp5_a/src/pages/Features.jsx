const Features = () => {
  return (
    <section className="panel">
      <h2>Lazy Loading Playbook</h2>
      <div className="grid">
        <article className="tile">
          <h3>Route-level splits</h3>
          <p>
            Each page is imported with React.lazy to cut the first bundle and
            delay code until navigation.
          </p>
        </article>
        <article className="tile">
          <h3>Suspense fallback</h3>
          <p>
            A focused loading state keeps the UI responsive while dynamic
            imports resolve.
          </p>
        </article>
        <article className="tile">
          <h3>Predictive navigation</h3>
          <p>
            Split routes allow the browser to cache upcoming chunks without
            blocking the initial render.
          </p>
        </article>
        <article className="tile">
          <h3>Smaller initial load</h3>
          <p>
            Critical UI ships first, while secondary views stay out of the main
            bundle.
          </p>
        </article>
      </div>
    </section>
  )
}

export default Features
