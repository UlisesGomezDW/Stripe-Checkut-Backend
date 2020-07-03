const express = require('express')
const http = require('http')
const expressHandle = require('express-handlebars')
const path = require('path')
const app = express()

//Templates config
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expressHandle({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}))
app.set('view engine', '.hbs')

//Utils
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//Routes
app.use(require('./routes/index'))
app.use('/payments', require('./routes/payment'))

//Server config
const server = http.createServer(app)
const  host = process.env.HOST || '0.0.0.0'
const  port = process.env.HOST || 5000
server.listen(port, host, ()=> console.log(`Running server on port ${port}`))