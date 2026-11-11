import { useStore } from '../context/Store'

function EventCard({ event }) {

  const {
    currentUser,
    registrations,
    registerEvent
  } = useStore()

  const alreadyRegistered = registrations.some(
    reg =>
      reg.eventId === event.id &&
      reg.userEmail === currentUser?.email
  )

  const registeredCount = registrations.filter(
    reg => reg.eventId === event.id
  ).length

  const handleRegister = () => {

    const message = registerEvent(event)

    if (message) {
      alert(message)
    } else {
      alert('Registration successful!')
    }
  }

  return (
    <div className="event-card">

      <span className="event-badge">
        {event.category}
      </span>

      <h2>{event.title}</h2>

      <p>{event.description}</p>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Time:</strong> {event.time}
      </p>

      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <div className="event-meta">
        <span>₹{event.price}</span>

        <span>
          {registeredCount}/{event.capacity} Registered
        </span>
      </div>

      {currentUser?.role === 'attendee' && (

        <button
          className="btn btn-small"
          onClick={handleRegister}
          disabled={
            alreadyRegistered ||
            registeredCount >= Number(event.capacity)
          }
        >
          {alreadyRegistered
            ? 'Registered'
            : registeredCount >= Number(event.capacity)
              ? 'Fully Booked'
              : 'Register Now'}
        </button>

      )}

    </div>
  )
}

export default EventCard