const mysql = require('./MySQL')
const usersDB = require('./usersDB')

module.exports = {
    addReserva: (username, cancha, date, callback)=>{
        usersDB.getUserId(username, (id, err)=>{
            if (err)
                callback(err)
            mysql.pool.query('INSERT INTO reservas VALUES( null, ?, ?, ?)', [cancha, id, date], (error) =>{
                callback(error)
            })
        })
    },
    checkReserva: (cancha, date, callback)=>{
        mysql.pool.query(
            "SELECT \"true\" FROM canchas WHERE canchas.id = ? AND canchas.canchas > (SELECT count(*) FROM canchas INNER JOIN reservas ON canchas.id = reservas.idCancha WHERE canchas.id = ? AND reservas.fecha = ?);",
            [cancha, cancha, date], (error, results) =>{
                if (error)
                    callback(undefined)
                else{
                    callback(results.length > 0)
                }
            })

    }

}
