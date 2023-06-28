const { User, Record } = require('../models')

const recordController = {
  getRecords: (req, res, next) => {
    return Record.findAll({
      where: { userId: req.user.id },
      raw: true
    })
      .then(records => {
        res.render('records', { records })
      })
      .catch(err => next(err))
  }
}

module.exports = recordController