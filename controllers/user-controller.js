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
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout() // 把 user id 對應的 session 清除掉，對伺服器來說 session 消失就等於是把使用者登出了。
    res.redirect('/signin')
  },
}

module.exports = userController
