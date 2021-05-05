import { Router } from 'express';
import productsController from '../controllers/productsController';
import isAdmin from '../middleware/IsAdmin'

const route = Router();

route.post('/',isAdmin,  productsController.add);
route.get('/', productsController.get);
route.patch('/:id',isAdmin, productsController.updateProduct);
route.delete('/:id',isAdmin, productsController.deleteProduct);
route.get('/:id' , productsController.OneProduct)

export default route;
