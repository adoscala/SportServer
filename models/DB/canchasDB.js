const mysql = require('./MySQL')
module.exports = {
    getCanchas: (callback) =>{
        mysql.pool.query('SELECT * FROM canchas', (err, results) =>{
            //TODO separar errores de BD con errores de aplicacion
            //TODO organizar mejor el objeto results
            callback(err, results)
        })
    },
    getCancha: (cancha, fecha, callback) => {
        //fecha = YYYY:MM:DD
        mysql.pool.query("SELECT canchas.*, reservas.fecha FROM canchas INNER JOIN reservas ON canchas.id = reservas.idCancha WHERE canchas.id = ? AND reservas.fecha LIKE ?;", [cancha, fecha + "%"], (error, results) =>{
            callback(error, results)
        })
    }
}