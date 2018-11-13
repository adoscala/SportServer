const canchasDB = require('./DB/canchasDB')
module.exports = {
    getCanchas: (callback)=>{  
        canchasDB.getCanchas(callback)
    },
    getCancha: (cancha, fecha, callback) => {
        //Devuelve una cancha con sus reservas en la fecha pedida
        canchasDB.getCancha(cancha, fecha, (error, reservas) =>{
            if (error){
                callback(error, null)
                return
            }
            var cancha = {}
            if (reservas.length != 0)
                for (key in reservas[0])
                    if (key != "fecha")
                        cancha[key] = reservas[0][key]
            cancha.reservas = []
            for (index in reservas)
                cancha.reservas.push(reservas[index].fecha)
            callback(null, cancha)
        })
    }
}