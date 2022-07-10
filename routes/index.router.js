const express = require('express')
const router = express.Router()
const indexController = require('../controller/index.controller')

router.get('/', indexController.get)

module.exports = router