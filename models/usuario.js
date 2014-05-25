var config  = require('../config/config.js');
connection = config.connection;



var Usuario = {};




Usuario.addUsuario = function(datos,callback){
    connection.query('INSERT INTO usuario SET ?', datos, 
        function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,'Agregado correctamente')
                
        }
    );
}


Usuario.existUsuario = function(condicion,callback){
    connection.query('SELECT * FROM usuario where ? LIMIT 1',condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });   
}

Usuario.getUsuario = function(condicion,callback){
    connection.query('SELECT * FROM usuario where ? LIMIT 1',condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });   
}

Usuario.loginUsuario = function(correo,pass,callback){    
    console.log(correo);
    connection.query('SELECT * from usuario where correo = ? and password = ? LIMIT 1',[correo , pass],function(err,rows){
        if (err) 
            callback(err,null);
        else
            if (rows[0]==undefined) {                
                callback(null,null);                
            }else{
                console.log('Se loguea el usuario : ' + rows[0].correo);   
                callback(null,rows);  
                
            }
    });
}



Usuario.getPaginas = function(condicion,callback){
    connection.query('SELECT pagina_nombre,pagina_dominio,pagina_status,up.pagina_id,pagina_visitas,status_class from usuario_pagina up INNER JOIN pagina p on up.pagina_id = p.pagina_id  INNER JOIN pagina_status ps on p.pagina_status = status_id where ?',condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });      
}

Usuario.getPagos = function(condicion,callback){
    connection.query('SELECT pago_id,pago_fecha, pago_pagina_id, pago_metodo,pagina_nombre,pago_cantidad from pagina_pago pp INNER JOIN pagina p on pago_pagina_id = pagina_id  where ? and pago_status=1 ORDER BY pago_fecha DESC',condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });    
}

Usuario.getPagosPendientes = function(condicion,callback){
    connection.query('SELECT pago_id,pago_fecha, pago_pagina_id, pago_metodo,pagina_nombre,pago_cantidad from pagina_pago pp INNER JOIN pagina p on pago_pagina_id = pagina_id  where ? and pago_status=0 ORDER BY pago_fecha DESC',condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });    
}

Usuario.getFacturas = function(condicion,callback){
    connection.query('SELECT pago_id,pago_fecha, pago_pagina_id, pago_metodo,pagina_nombre,pago_cantidad,factura from pagina_pago pp INNER JOIN pagina p on pago_pagina_id = pagina_id  where  ? and pp.factura!="" ORDER BY pago_fecha DESC',condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });    
}


module.exports = Usuario;