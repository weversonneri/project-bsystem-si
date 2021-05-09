const {
  startOfHour,
  parseISO,
  isBefore,
  /*  format,
   subHours, */
} = require('date-fns');
const { User } = require('../models');
const { Appointment } = require('../models');

module.exports = {
  async store(req, res) {
    try {
      const { provider_id, date } = req.body;

      console.log(`Provider: ${req.userId} - UserID: ${req.userId}`);

      if (provider_id === req.userId) {
        return res.status(401).json({ error: true, message: 'You can not create appointments for yourself' });
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

      const hourStart = startOfHour(parseISO(date));
      console.log('PARSE DATE', hourStart);

      if (isBefore(hourStart, new Date())) {
        return res.status(401).json({ error: true, message: 'Past date are not permitted' });
      }

      const checkIsAvailable = await Appointment.findOne({
        where: {
          provider_id,
          status: 'A',
          date: hourStart,
        },
      });

      if (checkIsAvailable) {
        return res.status(400).json({ error: 'Appointment date is not available' });
      }

      const appointment = await Appointment.create({
        user_id: req.userId,
        provider_id,
        date,
      });

      return res.status(200).json({ error: false, appointment });
    } catch (err) {
      // console.log(error);
      return res.status(400).json({ error: true, message: err.message });
    }
  },
};
