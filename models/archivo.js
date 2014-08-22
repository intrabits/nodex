var config  = require('../config/config.js');
connection = config.connection;



var Pago = {};

Pago.addPago = function (datos,callback) {
    connection.query('INSERT INTO pagina_pago SET ?', datos, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows[0]);
    });  
}

Pago.getAll = function (condicion, callback) {
    connection.query('SELECT * from pagina_pago WHERE  ?', condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });  
}

module.exports = Pago;