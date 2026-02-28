const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };