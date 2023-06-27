const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const userController = require('../controllers/user-controller')
const recordController = require('../controllers/record-controller')

const { authenticated, authenticatedAdmin } = require('../middleware/auth') // 引入 auth.js
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/records', authenticated, recordController.getRecords)

router.use('/', (req, res) => res.redirect('/records'))
router.use('/', generalErrorHandler)

module.exports = router
