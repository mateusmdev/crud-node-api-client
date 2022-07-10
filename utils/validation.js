const { body } = require('express-validator');

module.exports = {
    validations: [
        body('nome', "É obrigatório passar nome no corpo da requisição").notEmpty(),
        body('sexo', 'É obrigatório passar sexo no corpo da requisição').notEmpty(),
        body('cidade', 'É obrigatório passar cidade no corpo da requisição').notEmpty()
    ],

}