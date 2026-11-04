# Event Management System – React

A web-based Event Management System developed using **React and Vite**. The application allows users to explore events, register for events, and manage their registrations. It also provides an admin module to manage events and monitor user activities.

## Features

### User Module
- User registration and login
- Browse available events
- View event details
- Register for events
- View personal events and registrations
- User dashboard

### Admin Module
- Admin login
- Admin dashboard
- View total events, users, and registrations
- Create and manage events
- Delete events
- Monitor user registrations

## Technologies Used

- **React.js** – Component-based user interface
- **Vite** – Frontend development and build tool
- **JavaScript** – Application functionality
- **HTML5** – Webpage structure
- **CSS3** – Styling and responsive design
- **React Router DOM** – Navigation between pages
- **Context API** – Shared application state
- **LocalStorage** – Browser-based data persistence

## Project Structure

```text
event-management-react/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── EventCard.jsx
│   │
│   ├── context/
│   │   └── Store.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Events.jsx
│   │   ├── CreateEvent.jsx
│   │   ├── MyEvents.jsx
│   │   ├── MyRegistrations.jsx
│   │   ├── UserDashboard.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd event-management-react
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Data Storage

The application uses browser LocalStorage to store user information, event details, registrations, and login state.

**Note:** LocalStorage data is browser- and device-specific. It does not synchronize information between different users or devices. The current implementation is a frontend demonstration and does not use a centralized backend database.

## Deployment

The application is deployed using Vercel.

**Live Demo:** https://event-management-system-phi-one.vercel.app

## Future Enhancements

- Backend and centralized database integration
- Secure user authentication
- Online event ticket payments
- Email notifications and reminders
- Advanced event search and filtering

## Author

Developed as part of the Frontend Development (FED) project.

**Project:** Event Management System  
**Framework:** React + Vite
