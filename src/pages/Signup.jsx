import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'

function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('attendee')
  const [message, setMessage] = useState('')

  const { signup } = useStore()
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()

    const error = signup({
      name,
      email,
      password,
      role
    })

    if (error) {
      setMessage(error)
    } else {
      alert('Account created successfully!')
      navigate('/login')
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

          <h1>Create Account</h1>

          <p className="form-intro">
            Join our Event Management System.
          </p>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <label>Register As</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>

          <button className="btn" type="submit">
            Sign Up
          </button>

          <p className="form-message">
            {message}
          </p>

          <p className="form-bottom">
            Already have an account?

            <Link to="/login"> Login</Link>
          </p>

        </form>

      </div>
    </>
  )
}

export default Signup