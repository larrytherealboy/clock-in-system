const bcrypt = require('bcryptjs')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      account: 'root',
      password: await bcrypt.hash('acuser', 10),
      is_admin: true,
      name: 'root',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      account: 'user1',
      password: await bcrypt.hash('acuser', 10),
      is_admin: false,
      name: 'user1',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
};
