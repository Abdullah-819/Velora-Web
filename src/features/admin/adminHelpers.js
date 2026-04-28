export const computeDashboardMetrics = (users, groups) => {
  const totalUsers = users.length
  const onlineUsers = users.filter((user) => user.status === 'online').length
  const totalGroups = groups.length
  const activeChatsToday = groups.filter((group) => group.activeToday).length

  return {
    totalUsers: totalUsers.toLocaleString(),
    onlineUsers: onlineUsers.toLocaleString(),
    totalGroups: totalGroups.toLocaleString(),
    activeChatsToday: activeChatsToday.toLocaleString(),
  }
}

export const filterUsers = (users, searchText, statusFilter) => {
  const query = searchText.trim().toLowerCase()

  return users.filter((user) => {
    const matchesFilter = statusFilter === 'all' || user.status === statusFilter
    const matchesSearch =
      query.length === 0 ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)

    return matchesFilter && matchesSearch
  })
}
