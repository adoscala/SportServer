var mysql = require('mysql')
const config = require('../../config')


/**
 * @module
 * Módulo encargado de manejar la conexión con la base de datos MySQL
 * @author Juan Andrés Mezzera
 */
exports.pool = mysql.createPool({
    "connectionLimit": config.MySQLConnectionLimit,
    "host": config.MySQLHost,
    "user": config.MySQLUser,
    "password": config.MySQLPass,
    "database": config.MySQLDB
    })
