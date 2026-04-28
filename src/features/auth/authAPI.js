const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const loginUser = async ({ email, password }) => {
  await wait(500)

  return {
    user: {
      id: 'u_1',
      name: 'Velora User',
      email,
    },
    token: `mock-token-${email}-${password.length}`,
  }
}

export const registerUser = async ({ fullName, email, password }) => {
  await wait(700)

  return {
    user: {
      id: 'u_2',
      name: fullName,
      email,
    },
    token: `mock-token-${email}-${password.length}`,
  }
}
