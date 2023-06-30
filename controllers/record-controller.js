const { User, Record } = require('../models')
const { formatDate, currentTaipeiTime } = require('../helpers/time-helper')

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
    const nowTime = currentTaipeiTime()
    const nowDate = formatDate(nowTime)
    console.log('taipeiTime', nowTime)
    console.log('nowDate', nowDate)

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
        req.flash('上班打卡成功')
        res.redirect('/records')
      })
      .catch(err => next(err))
  },
  clockout: (req, res, next) => {
    const nowTime = currentTaipeiTime()
    const nowDate = formatDate(nowTime)

    Record.findOne({
      where: {
        userId: req.params.id,
        date: nowDate
      }
    })
      .then(record => {
        if (!record) throw new Error("今天還沒打過上班卡了!")
        return record.update({
          clockout: nowTime,
          duration: 0,
          status: "clockout",
          isAttendance: null
        })
      })
      .then(() => {
        req.flash('下班打卡成功')
        res.redirect('/records')
      })
      .catch(err => next(err))
  }
}

module.exports = recordController