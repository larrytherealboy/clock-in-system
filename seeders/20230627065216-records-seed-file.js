'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    // const arrayStatus = ['clockin', 'clockout']
    // const arrayAttendance = ['attendance', 'absence']

    await queryInterface.bulkInsert('Records',
      Array.from({ length: 50 }, () => {
        let clockinTime = new Date()
        let clockoutTime = new Date(clockinTime)
        clockoutTime.setHours(clockoutTime.getHours() + Math.floor(Math.random() * 16))

        let duration = (clockoutTime - clockinTime) / 1000 / 60 / 60
        let is_attendance = ''
        if (duration >= 8) { is_attendance = true } else { is_attendance = false }

        return {
          user_id: users[Math.floor(Math.random() * users.length)].id,
          date: new Date(),
          clockin: clockinTime,
          clockout: clockoutTime,
          duration: duration,
          // status: arrayStatus[Math.floor(Math.random() * arrayStatus.length)],
          status: 'clockout',
          is_attendance: is_attendance,
          created_at: new Date(),
          updated_at: new Date(),
        }
      })
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Records', {})
  }
};
