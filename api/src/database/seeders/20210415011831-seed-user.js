// eslint-disable-next-line
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@mail.com',
        scope_id: 1,
        password_hash: await bcrypt.hash('admin123', 8),
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
