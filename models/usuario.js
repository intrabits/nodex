var config  = require('../config/config.js');
connection = config.connection;
var Lib     = require('./../lib/index.js');


var Usuario = {};




Usuario.addUsuario = function(datos,callback){
    connection.query('INSERT INTO usuario SET ?', datos, 
        function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,datos.insertId);
                
        }
    );
}

Usuario.perfil = function (id,callback) {
    connection.query('SELECT usuario_nombre,usuario_apellido_paterno,usuario_apellido_materno, usuario_email,usuario_telefono,usuario_rfc,usuario_razon_social,usuario_direccion_fiscal,usuario_facebook from usuario WHERE usuario_id =  ?', id, 
        function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,result[0])
                
        }
    );
}

Usuario.existFB = function(fb,callback){
    connection.query('SELECT * FROM usuario where usuario_facebook = ? LIMIT 1',fb, function(err, rows){        
        if (err) 
            callback(err,null);
        else{
            if (rows[0]==undefined) {
                callback(null,null);
            }else{          
                callback(null,rows[0]);                 
           }
        }
            
    });   
}

Usuario.update = function (data, id, callback) {    
    connection.query('UPDATE usuario SET ? WHERE usuario_id = ?',[data,id], 
        function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,'Edited!')
                
        }
    );    
}


Usuario.updatePass = function (oldP, newP, id, callback) {

    connection.query('SELECT usuario_password from usuario where usuario_id = ? LIMIT 1',id,function(err,rows){
        if (err) 
            callback(err,null);
        else                
            Lib.comparePassword(oldP,rows[0].usuario_password,function (err, data) {
                if (err) {console.log(err);}
                if(data){
                    Lib.cryptPassword(newP,function (err, hash) {
                        connection.query('UPDATE usuario SET usuario_password = ? WHERE usuario_id = ?',[hash,id], 
                            function (err, result) {
                                if (err)
                                    callback(err,null);
                                else
                                    callback(null,result);
                                    
                            }
                        );   
                    })
                                  
                    
                }
            })                           
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


Usuario.login = function(email,pass,callback){        

    connection.query('SELECT * from usuario where usuario_email = ? LIMIT 1',email,function(err,rows){
        if (err) 
            callback(err,null);
        else                
            Lib.comparePassword(pass,rows[0].usuario_password,function (err, data) {
                if (err) {console.log(err);}
                else{
                    if (data) {                        
                        callback(null,rows[0]);    
                    } else{                        
                        callback(null,null);
                    };                    
                    
                }
            })                           
    });
}


Usuario.loginFB = function(fb,callback){        

    connection.query('SELECT * from usuario where usuario_facebook = ? LIMIT 1',fb,function(err,rows){
        if (err) 
            callback(err,null);
        else                
            if (rows[0]) {
                callback(null,rows[0]);
            }else{
                callback('nope',null);
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