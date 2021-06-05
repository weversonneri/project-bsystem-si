const { isAfter, addHours } = require('date-fns');
const { User_token } = require('../models');
const { User } = require('../models');
const MailTrap = require('../../config/mail/Mailtrap');

module.exports = {
  async store(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: true, message: 'Usuario não encontrado.' });
      }

      const hasToken = await User_token.findOne({ where: { user_id: user.id } });

      if (hasToken) {
        await hasToken.destroy();
      }

      const token = await User_token.create({ user_id: user.id });

      await MailTrap.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: 'test reuc',
        context: {
          token: `http://localhost:3333/api/appointments?token=${token.password_reset_token}`,
        },
      });

      return res.status(201).json({ error: false, token });
    } catch (err) {
      return res.status(403).json({ error: true, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { new_password, token } = req.body;

      const userToken = await User_token.findOne({
        where: {
          password_reset_token: token,
        },
      });

      if (!token || !userToken) {
        return res.status(400).json({ error: true, message: 'Invalid or expired token' });
      }

      const user = await User.findOne({ where: { id: userToken.user_id } });

      if (!user) {
        return res.status(400).json({ error: true, message: 'Usuario não encontrado.' });
      }

      const tokenCreatedAt = userToken.createdAt;
      const compareExpiration = addHours(tokenCreatedAt, 1);

      if (isAfter(Date.now(), compareExpiration)) {
        return res.status(400).json({ error: true, message: 'Expired token.' });
      }

      user.password = new_password;
      await user.save();

      await userToken.destroy();

      return res.status(200).json({ error: false, user });
    } catch (err) {
      return res.status(403).json({ error: true, message: err.message });
    }
  },
};
