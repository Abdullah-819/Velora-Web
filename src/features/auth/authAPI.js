const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const ADMIN_EMAIL = 'admin@velora.com'
const ADMIN_PASSWORD = 'Velora@Admin2026'

const USER_EMAIL = 'user@email.com'
const USER_PASSWORD = '123'


export const loginUser = async ({ email, password, role = 'user' }) => {
  await wait(500)

  const normalizedRole = role === 'admin' ? 'admin' : 'user'

  if (
    normalizedRole === 'admin' &&
    (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD)
  ) {
    throw new Error('Invalid admin credentials')
  }

  if (
    normalizedRole === 'user' &&
    (email !== USER_EMAIL || password !== USER_PASSWORD)
  ) {
    throw new Error('Invalid user credentials')
  }

  return {
    user: {
      id: normalizedRole === 'admin' ? 'a_1' : 'u_1',
      name: normalizedRole === 'admin' ? 'Velora Admin' : 'Velora User',
      email,
      role: normalizedRole,
    },
    token: `mock-${normalizedRole}-token-${email}-${password.length}`,
  }
}

export const registerUser = async ({ fullName, email, password }) => {
  await wait(700)

  return {
    user: {
      id: 'u_2',
      name: fullName,
      email,
      role: 'user',
    },
    token: `mock-token-${email}-${password.length}`,
  }
}
