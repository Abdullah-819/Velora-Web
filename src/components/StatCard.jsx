function StatCard({ item }) {
  const trendClass = item.trendDirection === 'up' ? 'up' : 'down'

  return (
    <article className="admin-stat-card">
      <p>{item.label}</p>
      <h3>{item.value}</h3>
      <span className={trendClass}>{item.trend}</span>
    </article>
  )
}

export default StatCard
