import { Router } from 'express';
import authController from '../controllers/authController';
import CheckUser from '../middleware/CheckUser';
import SignupValidator from '../middleware/SignupValidator';
import isAdmin from '../middleware/IsAdmin';
const route = Router();

route.post('/signup',SignupValidator, CheckUser, authController.signup);
route.post('/signin',CheckUser,authController.singin);
route.get('/',authController.getAllUser);
route.get('/:id',authController.OneUser);
route.delete('/:id',isAdmin,authController.deleteUser);

export default route;
