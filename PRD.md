# Product Requirements Document

## Product

Task Manager

## 1. Overview

Task Manager is a web application that allows users to create an account, sign in, manage personal tasks, and sign out. Each task is stored with a time and is available only to the authenticated user.

## 2. Problem Statement

Users need a simple place to record tasks and their planned times without managing a separate document or list.

## 3. Goals

- Allow a new user to register with an email and password.
- Prevent duplicate accounts for the same email.
- Allow an existing user to sign in.
- Allow authenticated users to view, add, and delete tasks.
- Persist tasks in MongoDB.
- Protect user data with JWT-based authentication.
- Provide clear feedback for common errors.

## 4. Users

The primary user is an individual who wants a lightweight personal task list.

## 5. User Stories

- As a new user, I want to sign up so that I can use the task manager.
- As a registered user, I want to sign in so that I can access my tasks.
- As an authenticated user, I want to see my saved tasks after loading the dashboard.
- As an authenticated user, I want to add a task with a time.
- As an authenticated user, I want to delete a task.
- As a user, I want to sign out and prevent access to my dashboard.
- As a user, I want understandable messages when a request fails.

## 6. Functional Requirements

### Authentication

- Signup accepts email, password, and an initially empty task object.
- Signup returns HTTP 201 and a JWT on success.
- Signup returns HTTP 400 when the email already exists.
- Login returns HTTP 200 and a JWT on success.
- Login returns HTTP 404 when the user does not exist.
- Login returns HTTP 401 when the password is incorrect.
- The frontend stores the JWT in localStorage.

### Task Management

- The dashboard loads the authenticated user's data.
- A task consists of a task name and time.
- Adding a task updates the local state and persists the complete task object.
- Deleting a task updates the local state and persists the complete task object.
- Requests to read or update user data require a Bearer JWT.

### Navigation and UI

- `/` redirects to `/login`.
- `/login` displays the login form.
- `/signup` displays the signup form.
- `/dashboard` is protected and redirects unauthenticated users to `/login`.
- The interface must remain usable on desktop and mobile screen sizes.

## 7. Non-Functional Requirements

- Use JSON for API request and response bodies.
- Enable CORS for frontend-to-backend requests.
- Keep user tasks isolated by the authenticated user ID.
- Keep secrets and database configuration in environment variables.
- Display useful error states without exposing sensitive server details.

## 8. Success Criteria

- A user can register, receive a token, and reach the dashboard.
- An existing email produces the message "User already exists".
- A user can log in and see previously saved tasks.
- Add and delete operations remain after page reload.
- An unauthenticated request to protected endpoints is rejected.

## 9. Future Improvements

- Hash passwords with bcrypt or Argon2 before storing them.
- Add server-side validation for email format, password length, and task names.
- Store tasks as a separate collection if task volume grows.
- Add edit, completion, filtering, and sorting features.
- Replace localStorage tokens with a more secure cookie-based session strategy.
- Add automated frontend and backend tests.
