import { Router } from 'express';
const route = Router();
import categoriesController from '../controllers/category'
import isAdmin from '../middleware/IsAdmin'

route.post('/save',isAdmin ,categoriesController.createCategory);
route.get('/', categoriesController.getCategories);
route.patch('/:id',isAdmin , categoriesController.updateProductCategory);
route.delete('/:id',isAdmin , categoriesController.deleteProductCategory);
route.get('/:id',isAdmin , categoriesController.OneCategory);

export default route;
