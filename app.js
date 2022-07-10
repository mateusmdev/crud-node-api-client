const express = require('express')
const app = express()
const path = require('path')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const pessoaRouter = require('./routes/pessoa.router')
const indexRouter = require('./routes/index.router')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.use(cors())

app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*')
    req.header(
        'Access-Control-Allow-Header', 
        'Content-Type, Origin, X-Requerested-With, Accept, Authorization'
        )

	req.header(
		'Access-Control-Expose-Headers', 'X-My-Custom-Header, X-Another-Custom-Header'
	)

    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }

    next()
})

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    preflightContinue: true
}

app.use(cors(corsOptions))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.use('/pessoa', pessoaRouter)
app.use('/', indexRouter)

app.use('/', (req, res, next) => {
    const e = new Error('Rota não existente')
    e.status = 404
    next(e)
})

app.use('/', (e, req, res, next) => {
    res.status(e.status).json({
        Message: e.message,
        Status: e.status
    })
})

module.exports = app
