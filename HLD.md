# High-Level Design

## 1. System Summary
Task Manager is a two-tier web application:

- Frontend: React with Vite, running in the browser.
- Backend: Node.js with Express, exposing a JSON REST API.
- Database: MongoDB accessed through Mongoose.
- Authentication: JWT issued by the backend and sent by the frontend as a Bearer token.

## 2. Architecture

```text
Browser
  |
  | HTTP JSON requests
  v
React/Vite frontend :5173
  |
  | CORS-enabled API requests
  v
Express backend :5000
  |
  | Mongoose queries
  v
MongoDB
```

## 3. Frontend Responsibilities
- Render login, signup, protected dashboard, and navigation routes.
- Collect user input and submit API requests.
- Store the JWT after successful signup or login.
- Attach the JWT to protected requests.
- Render loading, success, empty, and error states.
- Maintain task state while the user works with the dashboard.

Important frontend areas:
- `frontend/src/main.jsx`: React root, router, and Auth0 provider setup.
- `frontend/src/App.jsx`: route definitions.
- `frontend/src/components/Login.jsx`: login workflow.
- `frontend/src/components/signup.jsx`: signup workflow.
- `frontend/src/components/Protected.jsx`: client-side token gate.
- `frontend/src/components/dashboard.jsx`: task retrieval and task management.
- `frontend/src/index.css`: shared responsive styling.

## 4. Backend Responsibilities
- Parse JSON requests and enable CORS.
- Register and authenticate users.
- Issue and verify JWTs.
- Read and update the authenticated user's tasks.
- Return consistent HTTP status codes and JSON messages.
- Connect to MongoDB using environment configuration.

Important backend areas:
- `backend/server.js`: environment loading, database startup, and HTTP listener.
- `backend/app.js`: Express middleware, routes, JWT verification, and responses.
- `backend/models/usermodel.js`: Mongoose user schema and model.
- `backend/config/db.js`: MongoDB connection helper.

## 5. Authentication Flow
1. The user submits signup or login credentials.
2. The frontend sends a JSON request to the backend.
3. The backend finds or creates the user.
4. The backend signs a JWT containing the user ID.
5. The frontend stores the token in localStorage.
6. Protected requests send `Authorization: Bearer <token>`.
7. The backend verifies the token and uses its user ID for database access.

## 6. Data Ownership
A user's token identifies the user record. The backend uses that ID for `/user` reads and updates, so task data is associated with the authenticated account rather than supplied by the browser.

## 7. Deployment Shape
For local development:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: configured through `MONGO_URI`

For production, the frontend and backend may be deployed separately. The frontend backend URL should be supplied through `VITE_BACKEND_URI`; the backend should receive `MONGO_URI`, `JWT_SECRET_KEY`, and `PORT` through its environment.

## 8. Main Risks
- Passwords are currently stored and compared as plain text.
- JWTs in localStorage are exposed to JavaScript running on the page.
- Task data is stored as an object, which limits task metadata and scaling.
- The client-side protected route is only a convenience; backend JWT verification remains the actual security boundary.
