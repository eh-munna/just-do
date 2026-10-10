import { Router } from 'express';
import userController from './user.controller';

const router = Router();

// * create user **
router.post('/', userController.createUser);

// * get all users **
router.get('/', userController.getUsers);

// * get user by id **
router.get('/:id', userController.getUserById);

const userRoutes = router;
export default userRoutes;
