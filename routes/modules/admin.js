const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.patch('/users/:id', adminController.patchUser)
router.get('/users', adminController.getUsers)

router.patch('/records/:id', adminController.patchRecords)
// router.patch('/records/clear/:id', adminController.clearRecords)
router.delete('/records/:id', adminController.deleteRecords)
router.get('/records', adminController.getRecords)

router.use('/', (req, res) => res.redirect('/admin/users'))

module.exports = router
