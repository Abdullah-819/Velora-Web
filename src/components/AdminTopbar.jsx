function AdminTopbar({ admin }) {
  return (
    <header className="admin-topbar">
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back, {admin.name}</p>
      </div>

      <div className="admin-topbar-actions">
        <label htmlFor="adminSearch" className="sr-only">
          Search dashboard
        </label>
        <input id="adminSearch" type="search" placeholder="Search reports, users, collections..." />
        <button type="button">Alerts</button>
        <button type="button">Export</button>
        <button type="button" className="admin-user-chip">
          <span>{admin.initials}</span>
          {admin.role}
        </button>
      </div>
    </header>
  )
}

export default AdminTopbar
