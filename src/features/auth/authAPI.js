const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const loginUser = async ({ email, password, role = 'user' }) => {
  await wait(500)

  const normalizedRole = role === 'admin' ? 'admin' : 'user'

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
