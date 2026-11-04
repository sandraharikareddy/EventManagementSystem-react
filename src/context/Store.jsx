import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

const StoreContext = createContext()

// ADMIN LOGIN DETAILS
export const ADMIN_EMAIL = 'harikareddy.sandra221@gmail.com'
export const ADMIN_PASSWORD = 'admin123'

// SAMPLE EVENTS
const sampleEvents = [
  {
    id: 101,
    title: 'Tech Innovation Summit 2026',
    date: '2026-11-12',
    time: '10:00',
    venue: 'KL University, Vijayawada',
    price: 499,
    capacity: 300,
    category: 'Conference',
    description: 'Explore the latest innovations in technology and artificial intelligence.',
    owner: 'events@system.com'
  },
  {
    id: 102,
    title: 'AI and Machine Learning Workshop',
    date: '2026-11-15',
    time: '11:00',
    venue: 'Computer Science Block',
    price: 299,
    capacity: 120,
    category: 'Workshop',
    description: 'Learn the fundamentals of AI and machine learning through practical sessions.',
    owner: 'events@system.com'
  },
  {
    id: 103,
    title: 'Cultural Fest 2026',
    date: '2026-11-20',
    time: '17:00',
    venue: 'KL University Auditorium',
    price: 199,
    capacity: 500,
    category: 'Cultural',
    description: 'Enjoy music, dance, performances and exciting cultural activities.',
    owner: 'events@system.com'
  },
  {
    id: 104,
    title: 'Inter College Hackathon',
    date: '2026-11-25',
    time: '09:00',
    venue: 'Innovation Centre',
    price: 399,
    capacity: 200,
    category: 'Hackathon',
    description: 'Build innovative solutions and showcase your coding skills.',
    owner: 'events@system.com'
  },
  {
    id: 105,
    title: 'Startup and Entrepreneurship Meet',
    date: '2026-12-01',
    time: '14:00',
    venue: 'Vijayawada Convention Centre',
    price: 349,
    capacity: 180,
    category: 'Business',
    description: 'Meet entrepreneurs and learn about startups and business opportunities.',
    owner: 'events@system.com'
  },
  {
    id: 106,
    title: 'Winter Music Carnival',
    date: '2026-12-10',
    time: '18:30',
    venue: 'City Grounds, Vijayawada',
    price: 599,
    capacity: 600,
    category: 'Music',
    description: 'Experience an exciting evening of live music and entertainment.',
    owner: 'events@system.com'
  }
]

// SAFE LOCAL STORAGE READER
const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {

  const [users, setUsers] = useState(
    () => readStorage('users', [])
  )

  const [events, setEvents] = useState(() => {
    const savedEvents = readStorage('events', [])

    // Keep existing events and add missing sample events
    return [
      ...sampleEvents.filter(
        sample => !savedEvents.some(
          saved => saved.id === sample.id
        )
      ),
      ...savedEvents
    ]
  })

  const [registrations, setRegistrations] = useState(
    () => readStorage('registrations', [])
  )

  const [currentUser, setCurrentUser] = useState(
    () => readStorage('currentUser', null)
  )

  const [adminLoggedIn, setAdminLoggedIn] = useState(
    () => localStorage.getItem('adminLoggedIn') === 'true'
  )

  // SAVE DATA

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem(
      'registrations',
      JSON.stringify(registrations)
    )
  }, [registrations])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify(currentUser)
      )
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  // SIGNUP

  const signup = (userData) => {

    const email = userData.email.trim().toLowerCase()

    const existingUser = users.find(
      user => user.email.toLowerCase() === email
    )

    if (email === ADMIN_EMAIL) {
      return 'This email is reserved for the administrator.'
    }

    if (existingUser) {
      return 'Email already registered.'
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      email
    }

    setUsers(prev => [...prev, newUser])

    return null
  }

  // LOGIN

  const login = (email, password) => {

    const normalizedEmail = email.trim().toLowerCase()

    // ADMIN LOGIN
    if (
      normalizedEmail === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setCurrentUser(null)
      setAdminLoggedIn(true)

      localStorage.setItem('adminLoggedIn', 'true')

      return {
        success: true,
        admin: true
      }
    }

    // NORMAL USER LOGIN
    const user = users.find(
      user =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === password
    )

    if (!user) {
      return {
        success: false
      }
    }

    setAdminLoggedIn(false)
    localStorage.removeItem('adminLoggedIn')

    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    })

    return {
      success: true,
      admin: false
    }
  }

  // LOGOUT

  const logout = () => {

    setCurrentUser(null)
    setAdminLoggedIn(false)

    localStorage.removeItem('currentUser')
    localStorage.removeItem('adminLoggedIn')
  }

  // CREATE EVENT

  const createEvent = (eventData) => {

    if (!currentUser || currentUser.role !== 'organizer') {
      return
    }

    const newEvent = {
      id: Date.now(),
      ...eventData,
      owner: currentUser.email
    }

    setEvents(prev => [...prev, newEvent])
  }

  // UPDATE EVENT

  const updateEvent = (eventId, updatedData) => {

    if (!currentUser) return

    setEvents(prev =>
      prev.map(event =>
        event.id === eventId &&
        event.owner === currentUser.email
          ? { ...event, ...updatedData }
          : event
      )
    )
  }

  // DELETE EVENT

  const deleteEvent = (eventId) => {

    if (
      !adminLoggedIn &&
      !events.some(
        event =>
          event.id === eventId &&
          event.owner === currentUser?.email
      )
    ) {
      return
    }

    setEvents(prev =>
      prev.filter(event => event.id !== eventId)
    )

    setRegistrations(prev =>
      prev.filter(reg => reg.eventId !== eventId)
    )
  }

  // REGISTER FOR EVENT

  const registerEvent = (event) => {

    if (!currentUser || currentUser.role !== 'attendee') {
      return 'Please login as an attendee.'
    }

    const alreadyRegistered = registrations.some(
      reg =>
        reg.eventId === event.id &&
        reg.userEmail === currentUser.email
    )

    if (alreadyRegistered) {
      return 'You are already registered.'
    }

    const registeredCount = registrations.filter(
      reg => reg.eventId === event.id
    ).length

    if (registeredCount >= Number(event.capacity)) {
      return 'This event is fully booked.'
    }

    const newRegistration = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      userEmail: currentUser.email,
      userName: currentUser.name,
      ticketId: 'TKT' + Date.now(),
      amount: Number(event.price)
    }

    setRegistrations(prev => [
      ...prev,
      newRegistration
    ])

    return null
  }

  return (
    <StoreContext.Provider
      value={{
        users,
        events,
        registrations,
        currentUser,
        adminLoggedIn,
        signup,
        login,
        logout,
        createEvent,
        updateEvent,
        deleteEvent,
        registerEvent
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}