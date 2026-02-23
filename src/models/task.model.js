const db = require('../config/db');

async function list(userId) {
  const { rows } = await db.query(
    'SELECT id, title, description, status, created_at, updated_at FROM tasks WHERE user_id = $1 ORDER BY id DESC',
    [userId]
  );
  return rows;
}

async function create(userId, title, description) {
  const { rows } = await db.query(
    `INSERT INTO tasks (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING id, title, description, status, created_at, updated_at`,
    [userId, title, description ?? null]
  );
  return rows[0];
}

async function update(userId, taskId, data) {
  const { title, description, status } = data;

  const { rows } = await db.query(
    `UPDATE tasks
     SET title = COALESCE($3, title),
         description = COALESCE($4, description),
         status = COALESCE($5, status),
         updated_at = NOW()
     WHERE user_id = $1 AND id = $2
     RETURNING id, title, description, status, created_at, updated_at`,
    [userId, taskId, title ?? null, description ?? null, status ?? null]
  );

  return rows[0];
}

async function remove(userId, taskId) {
  const result = await db.query('DELETE FROM tasks WHERE user_id = $1 AND id = $2', [userId, taskId]);
  return result.rowCount > 0;
}

module.exports = { list, create, update, remove };