const reservasDB = require('./DB/reservasDB')

function checkReserva(cancha, date, callback){
    reservasDB.checkReserva(cancha, date, callback)
}

module.exports = {
    addReserva: (username, cancha, date, callback) => {
        checkReserva(cancha, date, (verified)=>{
            console.log('verified', verified)
            if (!verified)
                callback("Unable to process request")
            else
                reservasDB.addReserva(username, cancha, date, callback)
        })
    }




}