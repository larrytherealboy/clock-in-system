const jwt = require('jsonwebtoken')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    console.log('11111')
    req.flash('success_messages', '成功登入！')
    res.redirect('/records')
  },
}

module.exports = userController
