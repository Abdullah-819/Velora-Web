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

export const statCardMeta = [
  { key: 'totalUsers', label: 'Total Users', trend: '+4.5% from last week', trendDirection: 'up' },
  { key: 'onlineUsers', label: 'Online Users', trend: '+2.1% from last week', trendDirection: 'up' },
  { key: 'totalGroups', label: 'Groups Created', trend: '+1.3% from last week', trendDirection: 'up' },
  { key: 'activeChatsToday', label: 'Active Chats Today', trend: '+5.2% from yesterday', trendDirection: 'up' },
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

export const initialUsers = [
  {
    id: 'u_101',
    username: 'Areeba Khan',
    email: 'areeba@velora.com',
    status: 'online',
    groupsCount: 5,
    lastActive: 'Just now',
  },
  {
    id: 'u_102',
    username: 'Ali Raza',
    email: 'ali.raza@velora.com',
    status: 'offline',
    groupsCount: 3,
    lastActive: '8m ago',
  },
  {
    id: 'u_103',
    username: 'Sara Ahmed',
    email: 'sara@velora.com',
    status: 'online',
    groupsCount: 8,
    lastActive: '2m ago',
  },
  {
    id: 'u_104',
    username: 'Hamza Qureshi',
    email: 'hamza@velora.com',
    status: 'offline',
    groupsCount: 2,
    lastActive: '22m ago',
  },
  {
    id: 'u_105',
    username: 'Noor Fatima',
    email: 'noor@velora.com',
    status: 'online',
    groupsCount: 4,
    lastActive: 'Just now',
  },
]

export const initialGroups = [
  { id: 'g_201', name: 'Design Team', memberCount: 12, activeToday: true },
  { id: 'g_202', name: 'Frontend Guild', memberCount: 18, activeToday: true },
  { id: 'g_203', name: 'Backend Squad', memberCount: 9, activeToday: false },
  { id: 'g_204', name: 'Product Ops', memberCount: 7, activeToday: true },
  { id: 'g_205', name: 'Moderators', memberCount: 6, activeToday: false },
]
