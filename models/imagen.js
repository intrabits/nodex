
var config  = require('./../config/config.js');
var fs      = require('fs');
var connection  = config.connection;

var Imagen = {};

Imagen.save = function (datos,callback) {
    connection.query('INSERT INTO imagen SET ?', datos, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows[0]);
    });  
}

Imagen.logo = function (logo,pagina_id,callback) {
    connection.query('UPDATE pagina set pagina_logo =  ? where pagina_id = ?',[logo,pagina_id], function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows[0]);
    });  
}


Imagen.fondo = function (logo,pagina_id,callback) {
    connection.query('UPDATE pagina set pagina_fondo =  ? where pagina_id = ?',[logo,pagina_id], function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows[0]);
    });  
}

Imagen.portada = function (logo,pagina_id,callback) {
    connection.query('UPDATE pagina set pagina_portada =  ? where pagina_id = ?',[logo,pagina_id], function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows[0]);
    });  
}


module.exports = Imagen;