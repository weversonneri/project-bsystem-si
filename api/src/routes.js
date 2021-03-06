const express = require('express');
const multer = require('multer');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const AppointmentController = require('./app/controllers/AppointmentController');
const ScheduleController = require('./app/controllers/ScheduleController');
const AvailabilityController = require('./app/controllers/AvailabilityController');
const ServiceController = require('./app/controllers/ServiceController');
const authMiddleware = require('./app/middlewares/authMiddleware');
const ProviderController = require('./app/controllers/ProviderController');
const AvatarController = require('./app/controllers/AvatarController');
const ForgotPasswordController = require('./app/controllers/ForgotPasswordController');

const uploadConfig = require('./config/upload');

const upload = multer(uploadConfig);

const routes = express.Router();

routes.post('/auth', AuthController.store);
routes.post('/users', UserController.store);

routes.get('/users/scope', authMiddleware, UserController.scope);

routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/:user_id', authMiddleware, UserController.show);
routes.put('/profile', authMiddleware, UserController.update);
routes.delete('/users', authMiddleware, UserController.delete);

routes.patch(
  '/users/upload-avatar',
  authMiddleware,
  upload.single('avatar'),
  AvatarController.update,
);

routes.get('/providers', authMiddleware, ProviderController.index);
routes.post('/providers', authMiddleware, ProviderController.store);

routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.get('/appointments', authMiddleware, AppointmentController.show);
routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.delete('/appointments/:appointment_id', authMiddleware, AppointmentController.delete);

routes.get('/services', authMiddleware, ServiceController.index);
// routes.get('/providers/:provider_id/services', authMiddleware, ServiceController.index);
routes.post('/providers/:provider_id/services', authMiddleware, ServiceController.store);
routes.delete('/providers/:provider_id/services', authMiddleware, ServiceController.delete);

routes.get('/schedules', authMiddleware, ScheduleController.index);
routes.get('/appointments-customer', authMiddleware, ScheduleController.show);

routes.get('/providers/:provider_id/availability', authMiddleware, AvailabilityController.index);

routes.post('/forgot-password', ForgotPasswordController.store);
routes.post('/reset-password', ForgotPasswordController.update);

module.exports = routes;
