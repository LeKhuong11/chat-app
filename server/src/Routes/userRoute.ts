import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/login', userController.login);
router.post('/register', userController.register);
router.get('/search', userController.searchUsers);

export default router;