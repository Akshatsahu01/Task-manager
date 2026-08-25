-- SQL JOIN example for relational task-manager data.
-- the application runtime uses MongoDB through Mongoose.

SELECT
  users.email,
  tasks.title,
  tasks.due_time
FROM users
INNER JOIN tasks ON tasks.user_id = users.id
WHERE users.id = 1;
