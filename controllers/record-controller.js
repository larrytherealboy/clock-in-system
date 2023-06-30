const { Record } = require('../models')
const { formatDate, currentTaipeiTime } = require('../helpers/time-helper')
const nowTime = currentTaipeiTime()
const nowDate = formatDate(nowTime)

const recordController = {
  getRecords: (req, res, next) => {
    return Record.findAll({
      where: { userId: req.user.id },
      order: [
        ['clockin', 'DESC']
      ],
      raw: true
    })
      .then(records => {
        res.render('records', { records })
      })
      .catch(err => next(err))
  },
  clockin: (req, res, next) => {
    Record.findOne({
      where: {
        userId: req.params.id,
        date: nowDate
      }
    })
      .then(record => {
        if (record) throw new Error("今天打過上班卡了!")
        return Record.create({
          userId: req.params.id,
          date: nowDate,
          clockin: nowTime,
          clockout: null,
          duration: 0,
          status: "clockin",
          isAttendance: null
        })
      })
      .then(() => {
        req.flash('success_messages', '上班打卡成功！')
        res.redirect('/records')
      })
      .catch(err => next(err))
  },
  clockout: (req, res, next) => {
    let duration = ''
    let isAttendance = ''

    Record.findOne({
      where: {
        userId: req.params.id,
        date: nowDate
      }
    })
      .then(record => {
        if (!record) throw new Error("今天還沒打過上班卡了!")
        duration = Math.floor((nowTime - record.toJSON().clockin) / 1000 / 60 / 60)
        if (duration >= 8) { isAttendance = true } else { isAttendance = false }

        return record.update({
          clockout: nowTime,
          duration,
          status: "clockout",
          isAttendance
        })
      })
      .then(() => {
        req.flash('success_messages', '下班打卡成功！')
        res.redirect('/records')
      })
      .catch(err => next(err))
  }
}

module.exports = recordController