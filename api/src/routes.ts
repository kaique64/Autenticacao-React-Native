import { Router } from 'express';
import TokenController from './controllers/TokenController';
import UserController from './controllers/UserController';
import AuthMiddleware from './middleware/AuthMiddleware';

const route = Router();

route.get('/authenticated', AuthMiddleware, UserController.index);
route.post('/', UserController.create);
route.post('/auth', TokenController.auth);

export default route;
