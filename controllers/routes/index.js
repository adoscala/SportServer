const express = require('express')
const api = express.Router()
const config = require('../../config')
var jwt = require('jsonwebtoken')

var loginPage = 'http://www.google.com' //TODO

const users = require('../../models/users')
const reservas = require('../../models/reservas')
const canchas = require('../../models/canchas')

api.put('/user/signin', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    users.signin(username, password, (error) => {
        if (error)
            res.status(500).send(error)
        else
            jwt.sign({ username, 'timestamp': Date.now() }, config.jwtSecret, (error, token) => {
                if (error)
                    res.send(500).send(error)
                else
                    res.status(201).json({ token })
            })
    })

})

api.post('/user/login', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    users.login(username, password, (error, verified) => {
        if (error) {
            res.status(500).send(error)
            return
        }
        else
            if (verified == undefined || !verified){
                res.sendStatus(403)
                return
            }
            else
                jwt.sign({ username, 'timestamp': Date.now() }, config.jwtSecret, (error, token) => {
                    if (error)
                        res.send(500).send(error)
                    else
                        res.status(200).json({ token })
                })
    })

})

api.put('/reservas', authenticate, (req, res) => {
    var username = res.locals.username
    var cancha = req.body.cancha
    var date = req.body.date

    reservas.addReserva(username, cancha, date, (err)=>{
        if (err){
            res.status(500).send(err)
            return
        }
        res.status(201).send()
    })
})

api.post('/canchas/:cancha', (req, res) =>{
    var cancha = req.params.cancha
    var date = req.body.date
    canchas.getCancha(cancha, date, (err, cancha)=>{
         if (err){
             res.status(500).send(error)
             return
         }
         res.status(200).json(cancha)
    })
    

})

api.get('/canchas', (req, res) =>{
    canchas.getCanchas((err, canchas)=>{
        if (err){
            res.status(500).send()
            return
        }
        res.status(200).json(canchas)
    })
})

function authenticate(req, res, next) {
    var token = req.headers['authorization']
    if (!token) {
        res.redirect(loginPage)
        return
    }
    token = token.split(' ')
    if (token.length != 2){
        res.status(502).redirect(loginPage)
        return
    }
    token = token[1]
    jwt.verify(token, config.jwtSecret, (error, decoded) => {
        if (error) {
            res.status(500).redirect(loginPage)
            return
        }
        if (decoded.username){
            res.locals.username = decoded.username
            next()
        }else{
            res.status(403).redirect(loginPage)
            return
        }
    });

}
module.exports = api
