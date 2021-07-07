require('dotenv').config();

module.exports = {
  driver: process.env.MAIL_DRIVER || 'mailtrap',

  defaults: {
    from: {
      email: 'admin@meusalao.online',
      name: 'Equipe MEUSALAO.ONLINE',
    },
  },
};
