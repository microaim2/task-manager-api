const db = require('../config/db');

async function getUserTasks(userId) {
  const result = await db.query(
    'SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

async function createTask(userId, title, description) {
  const result = await db.query(
    `INSERT INTO tasks (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING id, title, description, status, created_at, updated_at`,
    [userId, title, description ?? null]
  );
  return result.rows[0];
}

async function updateTask(userId, taskId, data) {
  const { title, description, status } = data;

  const result = await db.query(
    `UPDATE tasks
     SET title = COALESCE($3, title),
         description = COALESCE($4, description),
         status = COALESCE($5, status),
         updated_at = NOW()
     WHERE id = $2 AND user_id = $1
     RETURNING id, title, description, status, created_at, updated_at`,
    [userId, taskId, title ?? null, description ?? null, status ?? null]
  );

  return result.rows[0];
}

async function deleteTask(userId, taskId) {
  const result = await db.query(
    'DELETE FROM tasks WHERE id = $2 AND user_id = $1',
    [userId, taskId]
  );
  return result.rowCount > 0;
}

module.exports = { getUserTasks, createTask, updateTask, deleteTask };