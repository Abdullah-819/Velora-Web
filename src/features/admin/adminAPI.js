const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const buildId = () => `u_${Date.now()}_${Math.floor(Math.random() * 1000)}`

export const createUser = async (users, payload) => {
  await wait(220)

  const nextUser = {
    id: buildId(),
    username: payload.username.trim(),
    email: payload.email.trim().toLowerCase(),
    status: payload.status || 'offline',
    groupsCount: Number(payload.groupsCount) || 0,
    lastActive: payload.status === 'online' ? 'Just now' : 'Never',
  }

  return [nextUser, ...users]
}

export const updateUsername = async (users, userId, username) => {
  await wait(180)

  return users.map((user) =>
    user.id === userId ? { ...user, username: username.trim() } : user,
  )
}

export const deleteUser = async (users, userId) => {
  await wait(180)
  return users.filter((user) => user.id !== userId)
}

export const toggleUserStatus = async (users, userId) => {
  await wait(140)

  return users.map((user) => {
    if (user.id !== userId) {
      return user
    }

    const nextStatus = user.status === 'online' ? 'offline' : 'online'

    return {
      ...user,
      status: nextStatus,
      lastActive: nextStatus === 'online' ? 'Just now' : '1m ago',
    }
  })
}
