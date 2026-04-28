import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login } from './authSlice'

function Login() {
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLoading = status === 'loading'

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(login({ email, password }))
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-brand">Velora Web</p>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue your conversations.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footer">
          New to Velora? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
