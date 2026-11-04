import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useStore } from '../context/Store'

function CreateEvent() {

  const { createEvent, currentUser } = useStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    price: '',
    capacity: '',
    category: '',
    description: ''
  })

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!currentUser || currentUser.role !== 'organizer') {
      alert('Only organizers can create events.')
      return
    }

    createEvent({
      ...form,
      price: Number(form.price),
      capacity: Number(form.capacity)
    })

    alert('Event created successfully!')

    navigate('/my-events')
  }

  return (
    <>
      <Navbar />

      <div className="form-container">

        <form
          className="form-card"
          onSubmit={handleSubmit}
        >

          <h1>Create Event</h1>

          <p className="form-intro">
            Enter your event details.
          </p>

          <label>Event Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label>Time</label>

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <label>Venue</label>

          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            required
          />

          <label>Ticket Price</label>

          <input
            type="number"
            name="price"
            min="0"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label>Maximum Capacity</label>

          <input
            type="number"
            name="capacity"
            min="1"
            value={form.capacity}
            onChange={handleChange}
            required
          />

          <label>Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Cultural">Cultural</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Other">Other</option>
          </select>

          <label>Description</label>

          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Create Event
          </button>

        </form>

      </div>
    </>
  )
}

export default CreateEvent