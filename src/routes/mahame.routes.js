import { Router } from 'express';
const route = Router();
import mahameController from '../controllers/mahameController'
import isAdmin from '../middleware/IsAdmin'


route.get('/', mahameController.cre);


export default route;
