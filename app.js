const express = require('express');
const body_parser = require('body-parser');
const session = require('express-session')


const app = express();
const config = require('./config')

app.use(body_parser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended : true
}));

app.use(body_parser.json()); //esto permite peticiones con cuerpo de mensaje en formato json

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}))



const api = require('./controllers/routes')
app.use('/api', api)

module.exports = app