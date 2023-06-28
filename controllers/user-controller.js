const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Record } = require('../models')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/records')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout() // 把 user id 對應的 session 清除掉，對伺服器來說 session 消失就等於是把使用者登出了。
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    const userId = Number(req.params.id) || ''
    User.findByPk(userId, {
      raw: true,
      nest: true
    })
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        res.render('users/profile', { user })
      })
      .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    return User.findByPk((req.params.id), {
      nest: true,
      raw: true
    })
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        return res.render('users/edit', user)
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const { name, password, newPassword, confirmPassword } = req.body
    User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        if (!bcrypt.compareSync(password, user.password)) throw new Error("Old Password is wrong!")
        if (!newPassword) throw new Error("Password is required!")
        if (newPassword !== confirmPassword) throw new Error("Password didn't match!")
        return user.update({
          name,
          password: bcrypt.hashSync(newPassword, 10)
        })
      })
      .then(data => {
        req.flash('success_messages', '使用者資料編輯成功')
        res.render('users/edit', data)
        return res.redirect(`/users/${req.params.id}`)
      })
      .catch(err => next(err))
  }
}

module.exports = userController
