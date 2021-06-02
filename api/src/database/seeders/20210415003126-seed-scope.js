// eslint-disable-next-line
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('scopes', [
      {
        id: 1,
        name: 'ADMIN',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      },
      {
        id: 2,
        name: 'PROVIDER',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      },
      {
        id: 3,
        name: 'USER',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('scopes', null, {});
  },
};
