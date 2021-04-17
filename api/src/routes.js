const express = require('express');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const authMiddleware = require('./app/middlewares/authMiddleware');

const routes = express.Router();

routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users', authMiddleware, UserController.delete);

routes.post('/auth', AuthController.store);

module.exports = routes;
