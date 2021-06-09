const {
  startOfHour,
  parseISO,
  isBefore,
  getHours,
  /*  format,
   subHours, */
} = require('date-fns');
const { User } = require('../models');
const { Service } = require('../models');
const { Appointment } = require('../models');

module.exports = {

  async index(req, res) {
    try {
      const { page = 1, limit } = req.query;
      const appointment = await Appointment.findAll({
        attributes: ['id', 'date', 'status'],
        where: { status: 'A' },
        order: ['date'],
        limit,
        offset: (page - 1) * limit,
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'title'],
        }],
        raw: true,
        nest: true,
      });

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.body;

      const appointment = await Appointment.findByPk(id);

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async store(req, res) {
    try {
      const { provider_id, service_id, date } = req.body;

      const appointmentDate = startOfHour(parseISO(date));

      if (provider_id === req.userId) {
        return res.status(401).json({ error: true, message: 'You cannot create appointments for yourself' });
      }

      const checkIsProvider = await User.findOne({
        where: {
          id: provider_id,
          scope_id: 2,
        },
      });

      if (!checkIsProvider) {
        return res.status(401).json({ error: true, message: 'You can only create appointments with providers' });
      }

      if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
        return res.status(401).json({ error: true, message: 'You can only create appointments between 8:00 and 18:00' });
      }

      if (isBefore(appointmentDate, new Date())) {
        return res.status(401).json({ error: true, message: 'You cannot create an appointment on past date' });
      }

      const checkIsAvailable = await Appointment.findOne({
        where: {
          provider_id,
          user_id: req.userId,
          status: 'A',
          date: appointmentDate,
        },
      });

      if (checkIsAvailable) {
        return res.status(401).json({ error: true, message: 'This appointment date is not available' });
      }

      const appointment = await Appointment.create({
        user_id: req.userId,
        service_id,
        provider_id,
        date: appointmentDate,
      });

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { appointment_id } = req.params;

      const appointment = await Appointment.findByPk(appointment_id);

      if (!appointment) {
        return res.status(400).json({ error: true, message: 'Appointment not found!' });
      }

      appointment.status = 'I';

      await appointment.save();

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
  },
};
