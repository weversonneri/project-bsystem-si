const {
  startOfDay,
  endOfDay,
  parseISO,
} = require('date-fns');
const { Op } = require('sequelize');
const { User } = require('../models');
const { Appointment } = require('../models');

module.exports = {

  async index(req, res) {
    try {
      const isProvider = await User.findOne({
        where: {
          id: req.userId,
          scope_id: 2,
        },
      });

      if (!isProvider) {
        return res.status(401).json({ error: true, message: 'This user isnot a provider' });
      }

      const appointment = await Appointment.findAll({
        where: { status: 'A' },
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
        }],
        raw: true,
        nest: true,
      });

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      // console.log(error);
      return res.status(400).json({ error: true, message: err.message });
    }
  },
};
