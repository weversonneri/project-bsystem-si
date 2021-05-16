const {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  startOfHour,
  parseISO,
} = require('date-fns');
const { Op } = require('sequelize');
const { User } = require('../models');
const { Appointment } = require('../models');

module.exports = {

  async index(req, res) {
    try {
      const { date } = req.query;
      const { provider_id } = req.params;

      const checkIsProvider = await User.findOne({
        where: {
          id: provider_id,
          scope_id: 2,
        },
      });

      if (!checkIsProvider) {
        return res.status(401).json({ error: true, message: 'This user isnot a provider' });
      }

      if (!date) {
        return res.status(400).json({ error: 'Invalid date' });
      }

      // const searchDate = Number(date);
      const searchDate = startOfHour(parseISO(date));

      console.log(searchDate);
      // 2021-05-15 10:49:44

      const appointments = await Appointment.findAll({
        where: {
          provider_id,
          status: 'A',
          date: {
            [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
          },
        },
      });

      // console.log('APPOINTMENTS', appointments);

      const schedule = [
        '08:00', // 2019-09-18 08:00:00
        '09:00', // 2019-09-18 09:00:00
        '10:00', // 2019-09-18 10:00:00
        '11:00', // ...
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
      ];

      const available = schedule.map((value) => {
        const [hour, minute] = value.split(':');
        const time = setSeconds(
          setMinutes(setHours(searchDate, hour), minute),
          0,
        );

        return {
          value,
          time: format(time, "yyyy-MM-dd'T'HH:mm:ssxxx"),
          available:
            isAfter(time, new Date())
            && !appointments.find((a) => format(a.date, 'HH:mm') === value),
        };
      });

      return res.status(200).json({ error: false, available });
    } catch (err) {
      // console.log(error);
      return res.status(400).json({ error: true, message: err.message });
    }
  },
};
