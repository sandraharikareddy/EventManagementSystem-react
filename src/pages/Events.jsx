import { useState } from 'react'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { useStore } from '../context/Store'

function Events() {

  const { events } = useStore()
  const [search, setSearch] = useState('')

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navbar />

      <section className="page-section">

        <div className="page-title-block">

          <h1>Explore Events</h1>

          <p>
            Find and register for exciting events.
          </p>

        </div>

        <input
          className="search-box"
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="event-grid">

          {filteredEvents.length > 0 ? (

            filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))

          ) : (

            <div className="empty-message">
              <h3>No events found</h3>
              <p>Try searching with another keyword.</p>
            </div>

          )}

        </div>

      </section>
    </>
  )
}

export default Events