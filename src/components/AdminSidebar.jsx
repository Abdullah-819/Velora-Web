function AdminSidebar({ sections }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <span className="admin-sidebar-logo" />
        <div>
          <p>Velora Admin</p>
          <small>Control Center</small>
        </div>
      </div>

      <nav className="admin-nav">
        {sections.map((section) => (
          <div key={section.title} className="admin-nav-section">
            <p>{section.title}</p>
            {section.items.map((item) => (
              <button key={item.label} type="button" className={item.active ? 'is-active' : ''}>
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
