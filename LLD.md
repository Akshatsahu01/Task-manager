# Low-Level Design

## 1. Repository Structure

```text
Task-manager/
  HLD.md
  PRD.md
  LLD.md
  README.md
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
      main.jsx
      App.jsx
      index.css
      components/
        Login.jsx
        signup.jsx
        Protected.jsx
        dashboard.jsx
```

## 2. Environment Configuration

### Backend

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET_KEY`: secret used to sign and verify JWTs.
- `PORT`: HTTP port, defaulting to `5000`.

### Frontend

- `VITE_BACKEND_URI`: backend base URL, normally `http://localhost:5000`.

## 3. Database Model

### User

Collection: `users`

```json
{
  "_id": "ObjectId",
  "email": "string, required, unique, trimmed",
  "password": "string, required",
  "task": {
    "task name": "time string"
  }
}
```

The current Mongoose model uses `task` as a generic object with a default empty object. The object key is the task name and the value is the task time.

## 4. API Contract

### POST `/signup`

Request:

```json
{
  "email": "user@example.com",
  "password": "password",
  "task": {}
}
```

Responses:

- `201`: `{ "message": "Signup successful", "token": "..." }`
- `400`: `{ "message": "User already exists" }`
- `500`: `{ "message": "Server Error" }`

### POST `/login`

Request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Responses:

- `200`: `{ "message": "Login successful", "token": "..." }`
- `401`: `{ "message": "Incorrect password" }`
- `404`: `{ "message": "User not found" }`
- `500`: `{ "message": "Server Error" }`

### GET `/user`

Headers:

```text
Authorization: Bearer <jwt>
```

Responses:

- `200`: `{ "email": "...", "task": {} }`
- `401`: token missing or invalid
- `404`: user not found

### PUT `/user`

Headers:

```text
Authorization: Bearer <jwt>
Content-Type: application/json
```

Request:

```json
{
  "task": {
    "Finish report": "14:00"
  }
}
```

Responses:

- `200`: `{ "message": "Tasks updated successfully", "task": {} }`
- `401`: token missing or invalid
- `404`: user not found
- `500`: `{ "message": "Server Error" }`

## 5. Backend Control Flow

### JWT middleware

1. Read the `Authorization` header.
2. Return `401` if it is absent.
3. Extract the token after `Bearer`.
4. Verify it using `JWT_SECRET_KEY`.
5. Store decoded claims on `req.user`.
6. Continue to the protected route.

### Signup

1. Read `email`, `password`, and `task` from the body.
2. Query `User.findOne({ email })`.
3. Return `400` if a user exists.
4. Create the user.
5. Sign a one-hour JWT with the new user ID.
6. Return `201` and the token.

### Login

1. Find the user by email.
2. Return `404` if no user exists.
3. Compare the submitted password with the stored password.
4. Return `401` if they do not match.
5. Sign a one-hour JWT.
6. Return `200` and the token.

### Task update

1. Verify the JWT.
2. Read the task object from the request body.
3. Update the record identified by `req.user.id`.
4. Return the updated task object.

## 6. Frontend Control Flow

### Routing

- `App.jsx` maps URLs to components using React Router.
- `Protected.jsx` checks localStorage for a token before rendering children.
- `main.jsx` creates the React root and wraps the app in `BrowserRouter`.

### Signup and login state

Each auth component uses React state for email, password, and error text. On success, the returned token is saved and navigation goes to `/dashboard`.

### Dashboard state

- `task`: current task object.
- `loading`: controls the initial user request state.
- `authenticated`: controls redirect behavior.
- `input`: new task name.
- `time`: new task time, default `12:00`.

On mount, the dashboard calls `GET /user`. Adding or deleting a task updates state and sends the full task object through `PUT /user`.

## 7. Error Handling

- HTTP status codes determine user-facing messages in auth components.
- Failed task updates currently use an alert.
- Network exceptions should be handled explicitly so connection failures are distinct from API errors.
- Backend errors return a generic message and should not expose database details.

## 8. Recommended Technical Changes

- Hash and verify passwords with bcrypt or Argon2.
- Validate and normalize email input on the backend.
- Reject empty task names before sending an update.
- Use an array of task documents with IDs if tasks need editing, completion state, or sorting.
- Add rate limiting to authentication endpoints.
- Add automated API tests for each documented status code.
