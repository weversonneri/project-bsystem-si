const {
  startOfDay,
  endOfDay,
  parseISO,
  isAfter,
} = require('date-fns');
const { Op } = require('sequelize');
const { User } = require('../models');
const { Appointment } = require('../models');
const { Service } = require('../models');

module.exports = {

  async index(req, res) {
    try {
      const { page = 1, limit } = req.query;

      // const isProvider = await User.findOne({
      //   where: {
      //     id: req.userId,
      //     scope_id: 2,
      //   },
      // });

      // if (!isProvider) {
      //   return res.status(401).json({ error: true, message: 'This user isnot a provider' });
      // }

      const appointment = await Appointment.findAll({
        attributes: ['id', 'date', 'status'],
        where: {
          [Op.or]: [
            { provider_id: req.userId },
            { user_id: req.userId },
          ],
          status: 'A',
          date: {
            [Op.gte]: startOfDay(new Date()),
          },
        },
        order: ['date'],
        limit,
        offset: (page - 1) * limit,
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'url', 'avatar'],
        },
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'title', 'duration', 'description'],
        }],
        nest: true,
      });

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      // console.log(error);
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  async show(req, res) {
    try {
      const { page = 1, limit } = req.query;

      const appointment = await Appointment.findAll({
        attributes: ['id', 'date', 'status'],
        where: {
          user_id: req.userId,
          status: 'A',
          date: {
            [Op.gte]: startOfDay(new Date()),
          },
        },
        order: ['date'],
        limit,
        offset: (page - 1) * limit,
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'url', 'avatar'],
        },
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'title', 'duration', 'description'],
        }],
        nest: true,
      });

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      // console.log(error);
      return res.status(400).json({ error: true, message: err.message });
    }
  },

};
