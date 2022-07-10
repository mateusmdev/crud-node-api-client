const DAO = require('../persistence/dao')
const erros = require('../utils/erros.js')
const { validationResult } = require('express-validator');

module.exports = {

    get: async (req, res, next) => {
        try {
            const persistence = await new DAO()
            const result = await persistence.getAll()
            
            const response = {
                quantidade: result.length,
                pessoas: result.map(pessoa => {
                    return {
                        id: pessoa.id,
                        nome: pessoa.nome,
                        sexo: pessoa.sexo,
                        cidade: pessoa.cidade,
                        request: {
                            tipo: 'GET',
                            descricao: "Retona todas as pessoas",
                            url: 'http://localhost:3000/pessoas/' + pessoa.id
                        }
                    }
                })
            }

            res.status(200).json(response) 

        } catch (error) {
            erros(error, req, res)
        }
    },

    getParams: async (req, res, next) => {
        try {
            const persistence = await new DAO()
            const result = await persistence.get(req.params.id)

            const response = {
                id: result[0].id,
                nome: result[0].nome,
                sexo: result[0].sexo,
                cidade: result[0].cidade,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna detalhes de uma pessoa especifica',
                    url: 'http://localhost:3000/pessoas/' + result[0].id
                }
            }

            res.status(200).json(response)
        } catch (error) {
            erros(error, req, res)
        }
    },

    post: async (req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const persistence = await new DAO()
            await persistence.insert(req.body)

            const response = {
                mensagem: "Pessoa inserido com sucesso",
                usuarioCriado: {
                    nome: req.body.nome,
                    sexo: req.body.sexo,
                    cidade: req.body.cidade,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna detalhes de todas as pessoas',
                        url: 'http://localhost:3000/pessoas/'
                    }
                }
            }

        
            res.status(201).json(response)

        } catch (error) {
            erros(error, req, res)
        }
        
    },

    put: async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const persistence = await new DAO()
            await persistence.update(req.body)

            const response = {
                mensagem: "Pessoa atualizada com sucesso",
                usuarioCriado: {
                    id: req.body.id,
                    nome: req.body.nome,
                    sexo: req.body.sexo,
                    cidade: req.body.cidade,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna detalhes de uma pessoa especifica',
                        url: 'http://localhost:3000/pessoas/' + req.body.id
                    }
                }
            }

            res.status(201).json(response)

        } catch (error) {
            erros(error, req, res)
        }
    },

    delete: async (req, res, next) => {
        try {
            const persistence = await new DAO()
            await persistence.delete(req.body.id)

            const response = {
                mensagem: "Pessoa removida com sucesso",
                request: {
                    tipo: 'GET',
                    descricao: 'Retona todas as pessoas',
                    url: 'http://localhost:3000/pessoas/'
                }
            }
            res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(201).json(response)

        } catch (error) {
            erros(error, req, res) 
        }
    }
}