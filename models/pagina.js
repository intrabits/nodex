
var config  = require('../config/config.js');
var fs 		= require('fs');
var connection  = config.connection;

// No estoy seguro de que este sea el mejor lugar para poner esto, pero se requiere para poder buscar por "_id"
// var mongojs = require('mongojs');
// var ObjectId = mongojs.ObjectId;


var Pagina = {};

Pagina.getPaquetes = function(callback){
	connection.query('SELECT * FROM pagina_tipo   ORDER BY tipo_precio ASC', function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows);    				         
		}			
			
    });	
}

Pagina.getPagina = function(pagina_id, usuario_id ,callback){
	connection.query('SELECT *, (SELECT count(*) FROM pagina_cuenta WHERE cuenta_pagina_id = ?) as pagina_cuentas_usadas,  (SELECT count(*) FROM pagina_publicacion WHERE publicacion_pagina_id = ?) as pagina_publicaciones, (SELECT count(*) FROM pagina_mensaje WHERE mensaje_pagina_id = ?) as pagina_mensajes,(SELECT count(imagen_id) FROM pagina_galeria_imagen WHERE imagen_galeria_id IN (SELECT galeria_id FROM pagina_galeria where galeria_pagina_id = ?)) as pagina_imagenes, (SELECT count(seguidor_id) FROM pagina_seguidor WHERE seguidor_pagina_id = ?) as seguidores from pagina p INNER JOIN usuario_pagina up on up.pagina_id = p.pagina_id INNER JOIN pagina_tipo pt ON p.pagina_tipo_id = pt.tipo_id   where p.pagina_id = ? and up.usuario_id = ?',[pagina_id,pagina_id,pagina_id,pagina_id,pagina_id,pagina_id,usuario_id], function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows[0]);
    });   
}


Pagina.getPaginas = function(usuario_id,callback){	
	connection.query('SELECT pagina_nombre,pagina_vencimiento,pagina_dominio,pagina_status,up.pagina_id,pagina_visitas,status_class from usuario_pagina up INNER JOIN pagina p on up.pagina_id = p.pagina_id  INNER JOIN pagina_status ps on p.pagina_status = status_id where up.pagina_id in (SELECT pagina_id from usuario_pagina WHERE usuario_id = ?) GROUP by pagina_id',usuario_id, function(err, rows){   	
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });   
}

//	Crear una página nueva

Pagina.subdominio = function (subdominio,id, callback) {
	var buscar_subdominio = subdominio;
	connection.query("SELECT pagina_subdominio FROM pagina WHERE pagina_subdominio = ? LIMIT 1",[buscar_subdominio], function(err, rows){        
        if (err) 
            callback(err,null);
        else{
        		console.log(rows);        			
        		var nuevo;
        		if (rows[0]==undefined) {
        			
        			nuevo = subdominio
        		}else{
        			nuevo = rows[0].pagina_subdominio +'2';	
        		}

        		connection.query("UPDATE pagina set pagina_subdominio = ? where pagina_id = ?",[nuevo,id],function (err, rows) {
        			if (err) {
        				console.log(err);
        			} else{
						callback(null,nuevo);        				
        			};
        		});
        		
				
				
           
        }
        	
    }); 	
}

Pagina.addPagina = function (datos, callback) {	
	connection.query('INSERT INTO pagina SET ?',datos, function(err, result){                		
        if (err) {console.log(err);} 

        else{
	        var path='public/websites/paginas/'+result.insertId+'/';
	        console.log(path);
	        fs.mkdir(path,function(e){
	            if(!e || (e && e.code === 'EEXIST')){
	                
	                fs.writeFile(path+"/index.php", "<?php $pagina_id = "+result.insertId+"; require '../nucleo.php';?>", function(err) {
	                    if(err) {	                        
	                        callback(err,null);
	                    } else {
	                    	fs.mkdir(path+'img/',function (er) {
	                    		if (err) {callback(er);} 
	                    		else{
			                        console.log("Página guardada!");
	                        		callback(null,result.insertId);	                    			
	                    		};
	                    	});

	                    }
	                });

	            } else {
	                //debug
	                callback(err,null)
	                console.log(e);
	            }
	        });	
        };
        // res.send('Página agregada con el ID: ' + result.insertId);
        
    });  
}

// Revisar si un usuario tiene permisos para modificar una página
Pagina.owner = function (usuario_id, pagina_id, callback) {
	connection.query("SELECT id from usuario_pagina where usuario_id = ? and pagina_id = ?",[usuario_id,pagina_id], function(err, rows){        
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

/*
Suscriptores :)
*/

Pagina.seguidores = function (pagina_id,callback) {
	console.log(pagina_id);
	connection.query("SELECT * FROM pagina_seguidor WHERE seguidor_pagina_id = ?",pagina_id,function (err,rows) {
		if (err)
			callback(err,null);
		else{			
			callback(null,rows);
		}			
	});
}



//	Borrar página D:
Pagina.deletePagina = function(id,callback){	
	db.pagina.remove({'_id':id}, function(err, ok) {
		if( err ) {
			console.log("Ocurrió un error D:");	
			callback(err,null);
		}
		else {
			console.log("Página eliminada T.T");			
		}
	});
}



/*============================================================== Operaciones con secciones ===============================================================*/

//	Agregar sección a una página
Pagina.addSeccion = function (datos, callback) {
	connection.query('INSERT INTO pagina_seccion SET ?',datos, function(err, result){                		
        if (err) {console.log(err);} 
		else{
			callback(null,result);
		}        
    });  
}


//	Borrar sección D:
Pagina.deleteSeccion = function(documento,id,callback){	
	db.pagina.update({'_id':new ObjectId(documento)}, {$pull: {'secciones': {'_id':id }}},function(err, ok) {
		if( err ) {
			console.log("Ocurrió un error D:");	
			callback(err,null);
		}
		else {
			console.log("Sección eliminada T.T",ok);			
			callback(null,'ok');
		}
	});
}

//	Esta función guarda el ID de MySQL para facilitarnos la vida en angular y en ruteo en general :)
Pagina.setPagina_id = function(id,nuevo ,callback){	
	db.pagina.update({"_id":id},{$set:{'pagina_id':nuevo	}}, function(err, saved) {
		if( err ) {
			console.log("Ocurrió un error D:");	
			callback(err,null);
		}
		else {
			console.log("Página creada con ID: " + saved._id);
			callback(null,saved._id);
		}
	});
}

Pagina.addUsuario = function (usuario_id,pagina_id,callback) {
	connection.query('INSERT INTO usuario_pagina SET usuario_id = ? , pagina_id = ? ',[usuario_id,pagina_id], function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });	
}


/*------------------------------------------Cuentas de usuario---------------------------------------------*/

Pagina.addCuenta = function (email, pass, pagina_id, callback) {
	connection.query('INSERT INTO pagina_cuenta SET cuenta_email = ? , cuenta_password = ? , cuenta_pagina_id = ?',[email,pass,pagina_id], function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });	
}

Pagina.getCuentas = function(pagina_id,callback){
	connection.query('SELECT cuenta_email, cuenta_status FROM pagina_cuenta WHERE cuenta_pagina_id = ?',pagina_id, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });   
}


Pagina.getExpired = function (usuario_id, callback) {
	connection.query("SELECT p.pagina_id,p.pagina_nombre,p.pagina_vencimiento,up.usuario_id from usuario_pagina up INNER JOIN pagina p on p.pagina_id = up.pagina_id where up.usuario_id = ? and NOW()>p.pagina_vencimiento",[usuario_id], function(err, rows){        
        if (err) 
            callback(err,null);
        else
        	callback(null,rows);
    }); 
}

Pagina.update = function (pagina_id, usuario_id, datos, callback) {

	//	Primero comprobamos que el usuario actual tenga los permisos para editar esta página
	connection.query("SELECT usuario_id from usuario_pagina WHERE usuario_id = ? and pagina_id = ?",[usuario_id, pagina_id], function (err, result) {
		if (err) {
			console.log("Usuario no tiene los permisos adecuados");
			callback(err,null)}
		if (result){
			connection.query("UPDATE pagina set ? WHERE pagina_id = ?",[datos, pagina_id], function(err, result){        
				if (err) 
					callback(err,null);
				else			
					callback(null,result);
		    });	
		};
	});
			
}

Pagina.editRedes = function(id,datos,callback){
	db.pagina.update({_id:new ObjectId(id)},{$set:{redes:datos}}, function(err, data) {
		if( err) {
			console.log("Ocurrió un error");
			callback(err,null);
		}else {
			callback(null,'Ok');			
		}
	});		
}


Pagina.addBloque = function(documento, seccion, datos, callback){
	console.log(datos);
	db.pagina.update({'_id':new ObjectId(documento)},{$push:{secciones:datos} },function (err, data) {
		if (err) {console.log(err);callback(err,null);}
		else{
			console.log(data);
			callback(null,data)
		};
	});
}


Pagina.getPublicaciones = function(pagina_id,callback){
	connection.query('SELECT publicacion_id,publicacion_pagina_id,publicacion_titulo,publicacion_destacada, publicacion_destacada as destacar FROM pagina_publicacion where publicacion_pagina_id = ?  ORDER BY publicacion_fecha DESC', pagina_id, function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows);    				         
		}			
			
    });	
}

Pagina.togglePublicacionDestacada = function(publicacion_id,callback){
	connection.query('UPDATE pagina_publicacion SET publicacion_destacada = !publicacion_destacada WHERE publicacion_id =?', publicacion_id, function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows);    				         
		}			
			
    });	
}

Pagina.getPublicacion = function(publicacion_id,callback){
	connection.query('SELECT * FROM pagina_publicacion where publicacion_id = ?', publicacion_id, function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows[0]);
		}			
			
    });	
}

Pagina.addPublicacion = function (data, callback) {
	connection.query('INSERT INTO pagina_publicacion SET ?',data, function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });	
}

Pagina.imgPublicacion = function (data, id, callback) {
	console.log("editando publicacion "+id);
	connection.query('UPDATE pagina_publicacion SET publicacion_imagen = ? WHERE publicacion_id = ?  LIMIT 1',[data, id], function(err, result){        
		if (err) 
			callback(err,null);
		else{
			console.log(result);
			callback(null,result)
		}			
    });	
}

Pagina.getPublicacionPagina = function(publicacion_id,callback){
	connection.query('SELECT publicacion_pagina_id FROM pagina_publicacion where publicacion_id = ?', publicacion_id, function(err, rows){
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows[0].publicacion_pagina_id);
		}			
			
    });	
}

Pagina.updatePublicacion = function (publicacion_id, datos, callback) {

	connection.query("UPDATE pagina_publicacion set ? WHERE publicacion_id = ?",[datos, publicacion_id], function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result);
    });	
			
}

/*------------------------------	Mensajes	------------------------------*/
Pagina.getMensajes = function(pagina_id,callback){
	connection.query('SELECT * FROM pagina_mensaje where mensaje_pagina_id = ?  AND mensaje_status != 0 ORDER BY mensaje_fecha DESC', pagina_id, function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows);    				         
		}			
			
    });	
}

//	Traer un res
Pagina.getMensajesLatest = function(usuario_id,callback){
	connection.query('SELECT mensaje_id,mensaje_asunto,mensaje_fecha,mensaje_leido,mensaje_autor,pagina_nombre,pagina_id FROM pagina_mensaje m INNER JOIN pagina p on p.pagina_id = m.mensaje_pagina_id where mensaje_pagina_id IN (SELECT pagina_id FROM usuario_pagina WHERE usuario_id = ?)  AND mensaje_status != 0 ORDER BY mensaje_fecha DESC', usuario_id, function(err, rows){        
		if (err) 
			callback(err,null);
		else				
			callback(null,rows);    				         
    });	
}

Pagina.getMensajesPaginas = function(id,callback){
	connection.query('SELECT mensaje_id,mensaje_asunto, mensaje_fecha, mensaje_pagina_id, pagina_color FROM pagina_mensaje INNER JOIN pagina on mensaje_pagina_id = pagina_id where mensaje_pagina_id IN (SELECT pagina_id FROM usuario_pagina WHERE usuario_id = ? and mensaje_leido="mail-unread") ORDER BY mensaje_fecha DESC LIMIT 7', id, function(err, rows){        
		if (err) 
			callback(err,null);
		else
			callback(null,rows);    				         
			
    });	
}


Pagina.getMensajesStats = function(pagina_id,callback){
	connection.query('SELECT (SELECT count(*) from pagina_mensaje WHERE mensaje_pagina_id = ?) as mensajes_totales, (SELECT count(*) from pagina_mensaje WHERE mensaje_pagina_id = ? and mensaje_leido = "mail-unread") as mensajes_sin_leer, (SELECT count(*) from pagina_mensaje WHERE mensaje_pagina_id = ? and mensaje_status = 0) as mensajes_eliminados, (SELECT count(*) from pagina_mensaje WHERE mensaje_pagina_id = ? and mensaje_status = 2) as mensajes_destacados FROM pagina_mensaje WHERE mensaje_pagina_id = ? LIMIT 1', [pagina_id,pagina_id,pagina_id,pagina_id,pagina_id], function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows[0]);
		}			
			
    });	
}

Pagina.getMensaje = function(id,callback){
	connection.query('SELECT * FROM pagina_mensaje where mensaje_id = ?', id, function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows[0]);
		}			
			
    });	
}

Pagina.mensajeLeido = function(id,callback){
	connection.query('UPDATE pagina_mensaje set mensaje_leido = "0" where mensaje_id = ?', id, function(err, rows){        
		if (err) 
			callback(err,null);
		else{				
			callback(null,rows[0]);
		}			
			
    });	
}

Pagina.getGalerias = function(id,callback){
	connection.query('SELECT *,(SELECT imagen_url from pagina_galeria_imagen WHERE imagen_galeria_id = galeria_id LIMIT 1) as galeria_imagen FROM pagina_galeria where galeria_pagina_id = ? ',[id,id], function(err, rows){        
		if (err) 
			callback(err,null);
		else
			callback(null,rows);
    });	
}


Pagina.getGaleria = function(id,callback){
	connection.query('SELECT * FROM pagina_galeria where galeria_id = ? ',id, function(err, rows){        
		if (err) 
			callback(err,null);
		else
			callback(null,rows[0]);
    });	
}

Pagina.addGaleria = function (data, callback) {
	connection.query('INSERT INTO pagina_galeria SET ?',data, function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });	
}

Pagina.getImagenes = function(id,callback){
	connection.query('SELECT * FROM pagina_galeria_imagen where imagen_galeria_id = ? ORDER BY imagen_fecha DESC',id, function(err, rows){        
		if (err) 
			callback(err,null);
		else
			callback(null,rows);
    });	
}

Pagina.addImagen = function (data, callback) {
	connection.query('INSERT INTO pagina_galeria_imagen SET ?',data, function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });	
}

Pagina.updateGaleria = function (galeria_id, datos, callback) {

	connection.query("UPDATE pagina_galeria set ? WHERE galeria_id = ?",[datos, galeria_id], function(err, result){if (err) 
			callback(err,null);
		else			
			callback(null,result);
    });	
			
}

Pagina.updateImagen = function (datos, id, usuario_id, callback) {

	connection.query("UPDATE pagina_galeria_imagen set ? WHERE imagen_id = ?",[datos, id], function(err, result){
		if (err) 
			callback(err,null);
		else			
			callback(null,result);
    });	
			
}


Pagina.getSeccion = function(condicion,callback){
	connection.query('SELECT * FROM pagina_seccion where seccion_id = ? ', condicion, function(err, rows){        
		if (err) 
			callback(err,null);
		else
			if (rows[0]==undefined) {
				callback(null,null);
			}else{
				callback(null,rows);    
				console.log(rows[0])
           }
    });	
}

Pagina.getBloques = function(condicion,callback){
	connection.query('SELECT * FROM pagina_seccion_bloque where  ? ', condicion, function(err, rows){        
		if (err) 
			callback(err,null);
		else
			if (rows[0]==undefined) {
				callback(null,null);
			}else{
				callback(null,rows);    				
           }
    });	
}

module.exports = Pagina;