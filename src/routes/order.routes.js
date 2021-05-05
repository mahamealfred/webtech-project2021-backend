import { Router } from 'express';
import orderController from '../controllers/orderController';
import isAdmin from '../middleware/IsAdmin'
import isLogin from '../middleware/IsLogin';

const route = Router();

route.post('/', isLogin, orderController.add);
route.get('/', orderController.getAllOrder);
route.delete('/:id', orderController.deleteOrder);


export default route;