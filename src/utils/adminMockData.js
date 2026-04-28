export const adminProfile = {
  name: 'John Doe',
  initials: 'JD',
  role: 'Admin',
}

export const sidebarSections = [
  {
    title: 'General',
    items: [
      { label: 'Overview', icon: '●', active: true },
      { label: 'Users', icon: '◐' },
      { label: 'Collections', icon: '◍' },
      { label: 'Reports', icon: '◒' },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Campaigns', icon: '◉' },
      { label: 'Billing', icon: '◎' },
      { label: 'Settings', icon: '◌' },
    ],
  },
]

export const statCards = [
  { label: 'Total Users', value: '2,500', trend: '+4.5% from last week', trendDirection: 'up' },
  { label: 'Average Session', value: '123.5m', trend: '+2.3% from last week', trendDirection: 'up' },
  { label: 'Total Collections', value: '7,325', trend: '-1.1% from last week', trendDirection: 'down' },
  { label: 'Active Connections', value: '2,315', trend: '+3.4% from last week', trendDirection: 'up' },
]

export const campaignPerformance = [
  { title: 'Facebook Campaign', progress: 72 },
  { title: 'Twitter Campaign', progress: 63 },
  { title: 'Conventional Media', progress: 54 },
  { title: 'Billboards', progress: 41 },
]

export const activityRows = [
  { app: 'v1.6.2', traffic: '123k', status: 'Healthy' },
  { app: 'v1.6.1', traffic: '53k', status: 'Healthy' },
  { app: 'v1.6.0', traffic: '23k', status: 'Warning' },
  { app: 'v1.5.9', traffic: '9k', status: 'Monitor' },
]

export const quickSettings = [
  'Role policies synced',
  'Auto renew enabled',
  '2FA enforcement active',
  'Backup completed',
]
