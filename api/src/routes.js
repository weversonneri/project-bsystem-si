const express = require('express');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const AppointmentController = require('./app/controllers/AppointmentController');
const authMiddleware = require('./app/middlewares/authMiddleware');

const routes = express.Router();

routes.post('/auth', AuthController.store);

routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/id', authMiddleware, UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

routes.get('/user/scope', authMiddleware, UserController.scope);

routes.post('/appointment', authMiddleware, AppointmentController.store);

module.exports = routes;
