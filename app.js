if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const session = require('express-session')
// const passport = require('./config/passport')

const app = express()
const port = process.env.PORT || 3000
const SESSION_SECRET = 'secret'

// app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
// app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
// app.use(passport.initialize()) 
// app.use(passport.session()) 
app.use(methodOverride('_method'))

app.use(flash()) // 掛載套件
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  // res.locals.user = getUser(req)
  next()
})

app.get('/', (req, res) => res.send('hello'))

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

module.exports = app