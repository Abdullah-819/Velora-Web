import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { register } from './authSlice'

function Register() {
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector((state) => state.auth)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLoading = status === 'loading'

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(register({ fullName, email, password }))
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-brand">Velora Web</p>
        <h1>Create account</h1>
        <p className="auth-subtitle">Get started with secure team messaging.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />

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
            placeholder="Create password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
