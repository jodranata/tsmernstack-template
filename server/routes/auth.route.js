import express from 'express';
import { loginController, registerController } from '../controllers/auth.controller.js';
import validateEmptyForm from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json({ success: true, message: 'Register or login' }),
);

router.post('/login', validateEmptyForm, loginController);
router.post('/register', validateEmptyForm, registerController);

export default router;
