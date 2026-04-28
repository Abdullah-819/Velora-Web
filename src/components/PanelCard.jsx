function PanelCard({ title, subtitle, children }) {
  return (
    <section className="admin-panel-card">
      <header>
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}

export default PanelCard
