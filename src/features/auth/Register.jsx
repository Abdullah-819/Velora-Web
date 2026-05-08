import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Loader from '../../components/Loader'
import { Button } from '../../components'
import { register } from './authSlice'

function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLoading = status === 'loading'

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await dispatch(register({ fullName, email, password }))
    if (register.fulfilled.match(result)) {
      navigate('/messenger')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-visual auth-visual-register">
          <div className="auth-visual-scene">
            <div className="auth-stand" />
            <div className="auth-screen" />
            <div className="auth-person" />
          </div>
          <h2>Create your workspace identity</h2>
          <p>Set up your profile and start building your team communication hub.</p>
        </aside>

        <section className="auth-card auth-card-accent">
          <p className="auth-brand">Velora Web</p>
          <h1>Sign Up</h1>
          <p className="auth-subtitle">Create your account and get started in minutes.</p>

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

            <Button type="submit" loading={isLoading} className="w-full">
              Create account
            </Button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </section>
      </section>
    </main>
  )
}

export default Register
