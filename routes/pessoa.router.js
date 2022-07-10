const express = require('express')
const router = express.Router()
const pessoaController = require('../controller/pessoa.controller')
const {validations} = require('../utils/validation.js')


router.get('/', pessoaController.get)
router.get('/:id', pessoaController.getParams)
router.post('/', validations, pessoaController.post)
router.put('/', validations, pessoaController.put)
router.delete('/', pessoaController.delete)

module.exports = router