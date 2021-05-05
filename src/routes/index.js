import { Router } from 'express';
import categoryRoutes from './category.routes.js'
import UserRoutes from './auth.routes';
import ProductsRoutes from './products.routes';
import orderRoutes from './order.routes';

const route = Router();

route.use('/auth', UserRoutes);
route.use('/products', ProductsRoutes);
route.use('/category', categoryRoutes);
route.use('/order', orderRoutes);

export default route;
