import AdminSidebar from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'
import PanelCard from '../components/PanelCard'
import StatCard from '../components/StatCard'
import {
  activityRows,
  adminProfile,
  campaignPerformance,
  quickSettings,
  sidebarSections,
  statCards,
} from '../utils/adminMockData'

function AdminDashboard() {
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
          </section>
        </section>
      </section>
    </main>
  )
}

export default AdminDashboard
