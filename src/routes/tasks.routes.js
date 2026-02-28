const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { getTasks, postTask, putTask, deleteTask } = require('../controllers/tasks.controller');

const validate = require('../middleware/validate.middleware');
const { createTaskSchema, updateTaskSchema } = require('../validators/task.validators');

router.use(auth);
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management (JWT required)
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for current user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Missing/invalid token
 */
router.get('/', getTasks);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first task
 *               description:
 *                 type: string
 *                 example: hello
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Missing/invalid token
 */
router.post('/', validate(createTaskSchema), postTask);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task (title/description/status)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, in_progress, done]
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 *       401:
 *         description: Missing/invalid token
 */
router.put('/:id', validate(updateTaskSchema), putTask);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 *       401:
 *         description: Missing/invalid token
 */
router.delete('/:id', deleteTask);

module.exports = router;