-- Project-specific SQL JOIN example.
-- The application currently stores each user's tasks inside a MongoDB
-- document. If the data were normalized into SQL tables, users and tasks
-- would have a one-to-many relationship through tasks.user_id.
--
-- This LEFT JOIN loads the signed-in user's email and task list together.
-- LEFT JOIN is useful here because a newly registered user may have no tasks
-- yet, but should still appear in the dashboard response.

SELECT
  users.id AS user_id,
  users.email,
  tasks.id AS task_id,
  tasks.name AS task_name,
  tasks.time AS task_time
FROM users
LEFT JOIN tasks ON tasks.user_id = users.id
WHERE users.id = 1
ORDER BY tasks.time;
