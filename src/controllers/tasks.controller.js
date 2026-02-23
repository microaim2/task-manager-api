const Task = require('../models/task.model');

async function getTasks(req, res) {
  const tasks = await Task.list(req.user.id);
  res.json({ tasks });
}

async function postTask(req, res) {
  const { title, description } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = await Task.create(req.user.id, title.trim(), description);
  res.status(201).json({ task });
}

async function putTask(req, res) {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId)) return res.status(400).json({ error: 'Invalid task id' });

  const { title, description, status } = req.body;

  if (status && !['todo', 'in_progress', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const updated = await Task.update(req.user.id, taskId, { title, description, status });
  if (!updated) return res.status(404).json({ error: 'Task not found' });

  res.json({ task: updated });
}

async function deleteTask(req, res) {
  const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId)) return res.status(400).json({ error: 'Invalid task id' });

  const ok = await Task.remove(req.user.id, taskId);
  if (!ok) return res.status(404).json({ error: 'Task not found' });

  res.status(204).send();
}

module.exports = { getTasks, postTask, putTask, deleteTask };