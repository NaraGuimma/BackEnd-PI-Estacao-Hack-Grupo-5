import express from 'express';
import UsersController from './controllers/UsersController';
const routes = express.Router();
const usersControllers = new UsersController();

routes.get('/users', usersControllers.index);
routes.post('/users', usersControllers.create);

routes.get('/', usersControllers.main);

export default routes;
