const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller');

const validate = require('../middleware/validate.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validators');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;

const { body } = require('express-validator');

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  register
);