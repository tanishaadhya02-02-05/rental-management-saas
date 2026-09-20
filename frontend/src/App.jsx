import { useState } from 'react'
import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
} from './auth'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  async function handleSignup() {
    try {
      await registerUser(email, password)

      setMessage(
        'Account created. Check your email for the verification code.'
      )
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleVerify() {
    try {
      await verifyUser(email, code)

      setMessage('Email verified successfully. You can now log in.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleLogin() {
    try {
      await loginUser(email, password)

      const user = await getLoggedInUser()

      setMessage(`Logged in as ${user.username}`)
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleLogout() {
    try {
      await logoutUser()

      setMessage('Logged out successfully.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>RentHub</h1>

      <p>Rental Management Platform</p>

      <hr />

      <h2>Create Owner Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSignup}>
        Create Account
      </button>

      <hr />

      <h2>Verify Email</h2>

      <input
        type="text"
        placeholder="Verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleVerify}>
        Verify Email
      </button>

      <hr />

      <h2>Login</h2>

      <button onClick={handleLogin}>
        Login
      </button>

      <br />
      <br />

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      <p>{message}</p>
    </div>
  )
}

export default App