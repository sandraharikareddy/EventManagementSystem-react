import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const { login } = useStore()
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()

    const result = login(email, password)

    if (!result.success) {
      setMessage('Invalid email or password.')
      return
    }

    if (result.admin) {
      navigate('/admin-dashboard')
    } else {
      navigate('/user-dashboard')
    }
  }

  return (
    <>
      <Navbar />

      <div className="form-container">

        <form
          className="form-card"
          onSubmit={handleSubmit}
        >

          <h1>Login</h1>

          <p className="form-intro">
            Welcome back! Login to continue.
          </p>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn">
            Login
          </button>

          <p className="form-message">
            {message}
          </p>

          <p className="form-bottom">
            Don't have an account?

            <Link to="/signup"> Sign Up</Link>
          </p>

        </form>

      </div>
    </>
  )
}

export default Login