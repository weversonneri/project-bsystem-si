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

      const { date } = req.query;
      const parsedDate = parseISO(date);

      // if (isBefore(parsedDate, new Date())) {
      // eslint-disable-next-line max-len
      //   return res.status(401).json({ error: true, message: 'You cannot create an appointment on past date' });
      // }

      // console.log(startOfDay(parsedDate), endOfDay(parsedDate));

      const appointment = await Appointment.findAll({
        where: {
          provider_id: req.userId,
          status: 'A',
          date: {
            [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
          },
        },
        // include: [{
        //   model: User,
        //   as: 'user',
        //   attributes: ['id', 'name', 'email'],
        // },
        // ],
        order: ['date'],
        raw: true,
        nest: true,
      });

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      // console.log(error);
      return res.status(400).json({ error: true, message: err.message });
    }
  },

  // async index(req, res) {
  //   try {
  //     const isProvider = await User.findOne({
  //       where: {
  //         id: req.userId,
  //         scope_id: 2,
  //       },
  //     });

  //     if (!isProvider) {
  //       return res.status(401).json({ error: true, message: 'This user isnot a provider' });
  //     }

  //     const { date } = req.query;
  //     const parsedDate = parseISO(date);

  //     console.log('DATE ', parsedDate);

  //     const appointment = await Appointment.findAll({
  //       where: {
  //         provider_id: req.userId,
  //         status: 'A',
  //       },
  //       include: [{
  //         model: User,
  //         as: 'user',
  //         attributes: ['id', 'name', 'email'],
  //       },
  //         // {
  //         //   model: User,
  //         //   as: 'provider',
  //         //   attributes: ['id', 'name', 'email'],
  //         // }
  //       ],
  //       raw: true,
  //       nest: true,
  //     });

  //     return res.status(200).json({ error: false, appointment });
  //   } catch (err) {
  //     // console.log(error);
  //     return res.status(400).json({ error: true, message: err.message });
  //   }
  // },
};
