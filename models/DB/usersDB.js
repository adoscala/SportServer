const mysql = require('./MySQL')

module.exports = {
    addUser: (username, hash, callback) =>{
        mysql.pool.query('INSERT INTO usuarios VALUES (null, ?,?, 0);', [username, hash], (error, results, fields)=>{
            callback(error) //TODO separar errores de BD de errores de la app
        })
    },
    login: (username, callback) =>{
        console.log(username);
        
        mysql.pool.query('SELECT pass AS hash FROM usuarios WHERE nombre = ?;', [username], (error,results, fields) =>{
            if (results.length == 0)
                callback(error, undefined)
            else
                callback(error, results[0].hash)
        })
    },
    getUserId: (username, callback) =>{  
        mysql.pool.query('SELECT id FROM usuarios WHERE nombre = ?', [username], (error, results, fields) =>{
            if (results.length == 0)
                callback(null, "User not found").
            else
                callback(results[0].id, error)
        })
    }
}