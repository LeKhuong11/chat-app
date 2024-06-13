import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

const userController = new UserController();


router.get('/login', userController.login);
router.post('/register', userController.register);
router.get('/search', userController.searchUsers);

export default router;