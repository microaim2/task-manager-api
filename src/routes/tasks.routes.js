const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { getTasks, postTask, putTask, deleteTask } = require('../controllers/tasks.controller');

const validate = require('../middleware/validate.middleware');
const { createTaskSchema, updateTaskSchema } = require('../validators/task.validators');

router.use(auth);

router.get('/', getTasks);
router.post('/', validate(createTaskSchema), postTask);
router.put('/:id', validate(updateTaskSchema), putTask);
router.delete('/:id', deleteTask);

module.exports = router;