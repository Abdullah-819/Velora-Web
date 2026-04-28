import { useMemo, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'
import PanelCard from '../components/PanelCard'
import StatCard from '../components/StatCard'
import {
  createUser,
  deleteUser,
  toggleUserStatus,
  updateUsername,
} from '../features/admin/adminAPI'
import { computeDashboardMetrics, filterUsers } from '../features/admin/adminHelpers'
import {
  activityRows,
  adminProfile,
  campaignPerformance,
  initialGroups,
  initialUsers,
  quickSettings,
  sidebarSections,
  statCardMeta,
} from '../utils/adminMockData'

function AdminDashboard() {
  const [users, setUsers] = useState(initialUsers)
  const [groups] = useState(initialGroups)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    status: 'offline',
  })
  const [editingUserId, setEditingUserId] = useState(null)
  const [editingUsername, setEditingUsername] = useState('')

  const metrics = useMemo(
    () => computeDashboardMetrics(users, groups),
    [users, groups],
  )
  const visibleUsers = useMemo(
    () => filterUsers(users, searchText, statusFilter),
    [users, searchText, statusFilter],
  )
  const statCards = statCardMeta.map((item) => ({
    ...item,
    value: metrics[item.key],
  }))

  const handleCreateUser = async (event) => {
    event.preventDefault()

    if (!newUser.username.trim() || !newUser.email.trim()) {
      return
    }

    const updatedUsers = await createUser(users, newUser)
    setUsers(updatedUsers)
    setNewUser({ username: '', email: '', status: 'offline' })
  }

  const startEdit = (user) => {
    setEditingUserId(user.id)
    setEditingUsername(user.username)
  }

  const submitEdit = async (event) => {
    event.preventDefault()

    if (!editingUsername.trim() || !editingUserId) {
      return
    }

    const updatedUsers = await updateUsername(users, editingUserId, editingUsername)
    setUsers(updatedUsers)
    setEditingUserId(null)
    setEditingUsername('')
  }

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Delete this user record?')
    if (!confirmDelete) {
      return
    }

    const updatedUsers = await deleteUser(users, userId)
    setUsers(updatedUsers)
  }

  const handleToggleUserStatus = async (userId) => {
    const updatedUsers = await toggleUserStatus(users, userId)
    setUsers(updatedUsers)
  }

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <AdminSidebar sections={sidebarSections} />

        <section className="admin-main">
          <AdminTopbar admin={adminProfile} />

          <section className="admin-content">
            <section className="admin-stat-grid">
              {statCards.map((item) => (
                <StatCard key={item.label} item={item} />
              ))}
            </section>

            <section className="admin-chart-layout">
              <PanelCard
                title="Network Activities"
                subtitle="Traffic patterns from the last 7 days"
              >
                <div className="chart-visual">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </PanelCard>

              <PanelCard title="Top Campaign Performance">
                <div className="campaign-list">
                  {campaignPerformance.map((campaign) => (
                    <div key={campaign.title} className="campaign-item">
                      <p>{campaign.title}</p>
                      <div>
                        <span style={{ width: `${campaign.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </PanelCard>
            </section>

            <section className="admin-lower-grid">
              <PanelCard title="App Versions" subtitle="Usage across versions">
                <div className="activity-table">
                  {activityRows.map((row) => (
                    <div key={row.app} className="activity-row">
                      <p>{row.app}</p>
                      <p>{row.traffic}</p>
                      <p>{row.status}</p>
                    </div>
                  ))}
                </div>
              </PanelCard>

              <PanelCard title="Quick Settings">
                <ul className="quick-settings-list">
                  {quickSettings.map((setting) => (
                    <li key={setting}>{setting}</li>
                  ))}
                </ul>
              </PanelCard>
            </section>

            <section className="admin-management-grid">
              <PanelCard title="Users Management" subtitle="Create, update username, delete, and monitor status">
                <div className="users-toolbar">
                  <input
                    type="search"
                    placeholder="Search by username or email"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                  />

                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <option value="all">All users</option>
                    <option value="online">Online only</option>
                    <option value="offline">Offline only</option>
                  </select>
                </div>

                <form className="user-create-form" onSubmit={handleCreateUser}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(event) =>
                      setNewUser((prev) => ({ ...prev, username: event.target.value }))
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(event) =>
                      setNewUser((prev) => ({ ...prev, email: event.target.value }))
                    }
                  />
                  <select
                    value={newUser.status}
                    onChange={(event) =>
                      setNewUser((prev) => ({ ...prev, status: event.target.value }))
                    }
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </select>
                  <button type="submit">Add user</button>
                </form>

                {editingUserId ? (
                  <form className="user-edit-form" onSubmit={submitEdit}>
                    <input
                      type="text"
                      value={editingUsername}
                      onChange={(event) => setEditingUsername(event.target.value)}
                    />
                    <button type="submit">Save username</button>
                    <button type="button" onClick={() => setEditingUserId(null)}>
                      Cancel
                    </button>
                  </form>
                ) : null}

                <div className="users-table">
                  <div className="users-table-head">
                    <p>User</p>
                    <p>Status</p>
                    <p>Groups</p>
                    <p>Last active</p>
                    <p>Actions</p>
                  </div>

                  {visibleUsers.map((user) => (
                    <div key={user.id} className="users-table-row">
                      <p>
                        <strong>{user.username}</strong>
                        <span>{user.email}</span>
                      </p>
                      <p>
                        <span
                          className={`status-chip ${user.status === 'online' ? 'online' : 'offline'}`}
                        >
                          {user.status}
                        </span>
                      </p>
                      <p>{user.groupsCount}</p>
                      <p>{user.lastActive}</p>
                      <p className="users-actions">
                        <button type="button" onClick={() => startEdit(user)}>
                          Edit name
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(user.id)}
                        >
                          Toggle status
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user.id)}
                          className="danger"
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  ))}
                </div>
              </PanelCard>

              <PanelCard title="Groups Snapshot" subtitle="Current chat groups and activity">
                <div className="groups-list">
                  {groups.map((group) => (
                    <div key={group.id} className="group-item">
                      <p>{group.name}</p>
                      <span>{group.memberCount} members</span>
                      <strong>{group.activeToday ? 'Active today' : 'Inactive today'}</strong>
                    </div>
                  ))}
                </div>
              </PanelCard>
            </section>
          </section>
        </section>
      </section>
    </main>
  )
}

export default AdminDashboard
