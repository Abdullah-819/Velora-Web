import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser } from './authAPI'

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
}

export const login = createAsyncThunk('auth/login', async (payload) => {
  const response = await loginUser(payload)
  return response
})

export const register = createAsyncThunk('auth/register', async (payload) => {
  const response = await registerUser(payload)
  return response
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Unable to login. Please try again.'
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.error.message || 'Unable to create account. Please try again.'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
