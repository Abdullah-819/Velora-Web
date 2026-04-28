import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Loader from '../../components/Loader'
import { login } from './authSlice'

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const isLoading = status === 'loading'

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await dispatch(login({ email, password, role }))

    if (login.fulfilled.match(result)) {
      navigate(role === 'admin' ? '/admin-dashboard' : '/messenger')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-visual auth-visual-login">
          <div className="auth-visual-scene">
            <div className="auth-stand" />
            <div className="auth-screen" />
            <div className="auth-person" />
          </div>
          <h2>Secure communication starts here</h2>
          <p>Collaborate in real time with organized channels and smart alerts.</p>
        </aside>

        <section className="auth-card auth-card-accent">
          <p className="auth-brand">Velora Web</p>
          <h1>Sign In</h1>
          <p className="auth-subtitle">Access your account as user or admin.</p>

          <div
            className={`auth-role-switch role-${role}`}
            aria-label="Login role selector"
          >
            <button
              type="button"
              className={role === 'user' ? 'is-active' : ''}
              onClick={() => setRole('user')}
            >
              User login
            </button>
            <button
              type="button"
              className={role === 'admin' ? 'is-active' : ''}
              onClick={() => setRole('admin')}
            >
              Admin login
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder={role === 'admin' ? 'admin@velora.com' : 'you@example.com'}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder={role === 'admin' ? 'Admin password' : 'Enter password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader size={16} />
                  Signing in...
                </>
              ) : (
                `Sign in as ${role}`
              )}
            </button>
          </form>

          <p className="auth-footer">
            New to Velora? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </section>
    </main>
  )
}

export default Login
