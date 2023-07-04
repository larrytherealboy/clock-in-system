const { User, Record } = require('../models')

const adminController = {
  getUsers: (req, res, next) => {
    return User.findAll({
      raw: true
    })
      .then(users => {
        res.render('admin/users', { users })
      })
      .catch(err => next(err))
  },
  patchUser: (req, res, next) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        if (user.dataValues.account === 'root@example.com') throw new Error('禁止變更 root 權限')
        return user.update({ isAdmin: !(user.dataValues.isAdmin) })
      })
      .then(() => {
        req.flash('success_messages', '使用者權限變更成功')
        res.redirect('/admin/users')
      })
      .catch(err => next(err))
  },
  getRecords: (req, res, next) => {
    return Record.findAll({
      order: [
        ['clockin', 'DESC']
      ],
      raw: true
    })
      .then(records => {
        res.render('admin/records', { records })
      })
  },
  patchRecords: (req, res, next) => {
    return Record.findByPk(req.params.id)
      .then(record => {
        if (!record) throw new Error("Record didn't exist!")
        return record.update({ isAttendance: !(record.dataValues.isAttendance) })
      })
      .then(() => {
        req.flash('success_messages', '出缺勤狀態變更成功')
        res.redirect('/admin/records')
      })
      .catch(err => next(err))
  },
  deleteRecords: (req, res, next) => {
    return Record.findByPk(req.params.id)
      .then(record => {
        if (!record) throw new Error("Record didn't exist!")
        return record.destroy()
      })
      .then(() => {
        req.flash('success_messages', '打卡記錄刪除成功')
        res.redirect('/admin/records')
      })
      .catch(err => cb(err))
  }
}

module.exports = adminController