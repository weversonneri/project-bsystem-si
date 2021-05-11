const express = require('express');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const AppointmentController = require('./app/controllers/AppointmentController');
const ScheduleController = require('./app/controllers/ScheduleController');
const authMiddleware = require('./app/middlewares/authMiddleware');

const routes = express.Router();

routes.post('/auth', AuthController.store);
routes.post('/users', UserController.store);

routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/id', authMiddleware, UserController.show);
routes.put('/users/:id', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

routes.get('/user/scope', authMiddleware, UserController.scope);

routes.get('/appointment', authMiddleware, AppointmentController.index);
routes.get('/appointment', authMiddleware, AppointmentController.show);
routes.post('/appointment', authMiddleware, AppointmentController.store);
routes.put('/appointment/:id', authMiddleware, AppointmentController.delete);

routes.get('/schedule', authMiddleware, ScheduleController.index);

module.exports = routes;
