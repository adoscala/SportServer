const usersDB = require('./DB/usersDB')
var passwordModule = require('password-hash-and-salt')

module.exports = {
    signin: (username, password, callback) => {
        passwordModule(password).hash((error, hash) => {
            if (error) {
                callback(error)
                return
            }

            usersDB.addUser(username, hash, callback)
        })
    },
    login: (username, password, callback) => {
        usersDB.login(username, (error, hash)=>{
            if (error){
                    callback(error, false)
                    return
                }
            if (hash == undefined)
                callback(null, undefined)
            else
                passwordModule(password).verifyAgainst(hash,(error, verified) =>{
                    if (error){
                        callback(error,false)
                        return
                    }
                    callback(null, verified)
                })
        })
    }


}