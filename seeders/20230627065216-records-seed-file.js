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
        let attendance_record = ''
        if (duration >= 8) { attendance_record = 'attendance' } else { attendance_record = 'absence' }

        return {
          user_id: users[Math.floor(Math.random() * users.length)].id,
          date: new Date(),
          clockin: clockinTime,
          clockout: clockoutTime,
          duration: duration,
          // status: arrayStatus[Math.floor(Math.random() * arrayStatus.length)],
          status: 'clockout',
          attendance_record: attendance_record,
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
