const express = require('express');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const authMiddleware = require('./app/middlewares/authMiddleware');

const routes = express.Router();

routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/id', authMiddleware, UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

routes.post('/auth', AuthController.store);

routes.get('/user/scope', authMiddleware, UserController.scope);

module.exports = routes;
