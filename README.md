# Task Manager

A full-stack task management application built with React, Vite, Node.js, Express, MongoDB, and JWT authentication.

Users can create an account, sign in, add tasks with times, view their saved tasks, delete tasks, and sign out.

## Features

- User signup and login
- Duplicate email detection
- JWT-based authentication
- Protected dashboard route
- Add and delete personal tasks
- MongoDB persistence
- Responsive user interface
- Clear authentication and request error messages

## Technology Stack

- Frontend: React 19, React Router, Vite
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens
- Styling: CSS

## Project Structure

```text
Task-manager/
	README.md
	HLD.md
	PRD.md
	LLD.md
	backend/
		app.js
		server.js
		config/db.js
		models/usermodel.js
		package.json
	frontend/
		.env
		package.json
		src/
			App.jsx
			main.jsx
			index.css
			components/
				Login.jsx
				signup.jsx
				Protected.jsx
				dashboard.jsx
```

## Prerequisites

- Node.js 18 or later
- npm
- A MongoDB database, local or hosted

## Installation

Install dependencies in both application folders:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment Variables

Create `backend/.env`:

```env
JWT_SECRET_KEY=replace-with-a-long-random-secret
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
PORT=5000
```

Create `frontend/.env`:

```env
VITE_BACKEND_URI=http://localhost:5000
```

Do not commit real database credentials or JWT secrets. Restart Vite after changing frontend environment variables.

## Running the Application

Open two terminals.

Terminal 1, backend:

```bash
cd backend
npm run dev
```

The API runs at `http://localhost:5000`.

Terminal 2, frontend:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in a browser.

## Available Routes

### Frontend Routes

| Route        | Purpose               |
| ------------ | --------------------- |
| `/`          | Redirects to login    |
| `/login`     | Sign in               |
| `/signup`    | Create an account     |
| `/dashboard` | View and manage tasks |

### Backend API

| Method | Endpoint  | Authentication | Purpose                                  |
| ------ | --------- | -------------- | ---------------------------------------- |
| `POST` | `/signup` | No             | Create a user and return a JWT           |
| `POST` | `/login`  | No             | Authenticate a user and return a JWT     |
| `GET`  | `/user`   | Bearer token   | Get the current user's profile and tasks |
| `PUT`  | `/user`   | Bearer token   | Replace the current user's task object   |

Protected requests must include:

```text
Authorization: Bearer <token>
```

## User Workflow

1. Open the application and choose signup.
2. Register with an email and password.
3. The backend creates the user and returns a JWT.
4. The frontend stores the token and opens the dashboard.
5. Add tasks by entering a task name and time.
6. Delete tasks when they are no longer needed.
7. Sign out to remove the local token and return to login.

## Useful Commands

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Backend:

```bash
npm run dev
```

## Current Limitations and Security Notes

- Passwords should be hashed with bcrypt or Argon2 before production use.
- JWTs are currently stored in browser localStorage.
- Task names are stored as keys in an object, so duplicate task names overwrite earlier entries.
- Backend validation should be expanded for password strength, email format, and empty task names.
- Automated tests have not yet been added.

For more detailed product, architecture, and implementation documentation, see [PRD.md](PRD.md), [HLD.md](HLD.md), and [LLD.md](LLD.md).
