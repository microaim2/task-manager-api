const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { getTasks, postTask, putTask, deleteTask } = require('../controllers/tasks.controller');

router.use(auth);

router.get('/', getTasks);
router.post('/', postTask);
router.put('/:id', putTask);
router.delete('/:id', deleteTask);

module.exports = router;