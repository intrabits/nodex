/*==============================================================================================================*/
/*================================Modelo utilizando MongoDB=====================================================*/
/*==============================================================================================================*/

var config  = require('../config/config.js');
connection  = config.connection;
db 			= config.db;

// No estoy seguro de que este sea el mejor lugar para poner esto, pero se requiere para poder buscar por "_id"
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;


var Pagina = {};

Pagina.getPagina = function(condicion,callback){	
	db.pagina.findOne(
		{_id:new ObjectId(condicion)}, 
		function(err, data) {
		if( err) {
			console.log("Ocurrió un error");
			callback(err,null);
		}else {
			callback(null,data);			
		}
	});	
}

Pagina.getPaginas = function(condicion,callback){
	connection.query('SELECT mongo,pagina_nombre,pagina_dominio,pagina_status,up.pagina_id,pagina_visitas,status_class from usuario_pagina up INNER JOIN pagina p on up.pagina_id = p.pagina_id  INNER JOIN pagina_status ps on p.pagina_status = status_id where ?',condicion, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows);
    });   
}

//	Esta función guarda la página en MongoDB
Pagina.createPagina = function(datos,callback){	
	db.pagina.save(datos, function(err, saved) {
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

Pagina.addPagina = function(datos,callback){
	connection.query('INSERT INTO pagina SET ? ', datos, function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });
}
//	Esta otra función guarda la página en MySQL

Pagina.addUsuario = function (datos,callback) {
	connection.query('INSERT INTO usuario_pagina SET ? ', datos, function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });	
}


Pagina.editPagina = function(id,datos,callback){
	db.pagina.update({_id:new ObjectId(id)},datos, function(err, data) {
		if( err) {
			console.log("Ocurrió un error");
			callback(err,null);
		}else {
			callback(null,'Ok');			
		}
	});	
	// console.log(id);
	// connection.query('UPDATE pagina SET ? WHERE pagina_id = ?',[datos,id], function(err, result){        
	// 	if (err) 
	// 		callback(err,null);
	// 	else{
	// 		console.log(result);			
	// 		callback(null,result[0]);
	// 	}
 //    });
}

// Pagina.addSeccion = function(datos,callback){
// 	connection.query('INSERT into pagina_seccion SET ?',datos,function(err,rows){
// 		if (err) {callback(err,null);}
// 		else{ 
// 			callback(null,rows);
// 			console.log('Sección agregada');
// 		}
// 	});
// }

Pagina.addSeccion = function(id, datos, callback){
	console.log(datos);
	db.pagina.update({'_id':new ObjectId(id)},{$push:{secciones:datos} },function (err, data) {
		if (err) {console.log(err);callback(err,null);}
		else{
			console.log(data);
			callback(null,data)
		};
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


// Pagina.getSecciones = function(condicion,callback){
// 	connection.query('SELECT * FROM pagina_seccion where ?  ORDER BY seccion_orden ASC', condicion, function(err, rows){        
// 		if (err) 
// 			callback(err,null);
// 		else
// 			if (rows[0]==undefined) {
// 				callback(null,null);
// 			}else{			
// 				callback(null,rows);    				
//            }
//     });	
// }

Pagina.getSeccion = function(condicion,callback){
	connection.query('SELECT * FROM pagina_seccion where ? ', condicion, function(err, rows){        
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