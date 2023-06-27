const bcrypt = require('bcryptjs')

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      account: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: 'admin',
      name: 'root',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      account: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: 'user',
      name: 'user1',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      account: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: 'user',
      name: 'user2',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
};
