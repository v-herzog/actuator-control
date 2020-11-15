const express = require('express')
const router = express.Router()

const controller = require('../controllers/actuatorController')

router.get('/:pin/:time', controller.get)
router.post('/position/:value', controller.postPosition)
router.post('/speed/:value', controller.postSpeed)
router.post('/enabled/:value', controller.postEnabled)
router.post('/acceleration/:value', controller.postAcceleration)
router.post('/slowdown/:value', controller.postSlowdown)

module.exports = router