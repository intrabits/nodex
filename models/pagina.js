var config  = require('../config/config.js');
connection = config.connection;


var Pagina = {};

Pagina.getPagina = function(condicion,callback){
	connection.query('SELECT * FROM pagina where ? ', condicion, function(err, rows){        
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
Pagina.addPagina = function(datos,callback){
	connection.query('INSERT INTO pagina SET ? ', datos, function(err, result){        
		if (err) 
			callback(err,null);
		else			
			callback(null,result.insertId);
    });
}
Pagina.editPagina = function(id,datos,callback){
	console.log(id);
	connection.query('UPDATE pagina SET ? WHERE pagina_id = ?',[datos,id], function(err, result){        
		if (err) 
			callback(err,null);
		else{
			console.log(result);			
			callback(null,result[0]);
		}
			

    });
}

Pagina.addSeccion = function(datos,callback){
	connection.query('INSERT into pagina_seccion SET ?',datos,function(err,rows){
		if (err) {callback(err,null);}
		else{ 
			callback(null,rows);
			console.log('Sección agregada');
		}
	});
}

Pagina.getSecciones = function(condicion,callback){
	connection.query('SELECT * FROM pagina_seccion where ?  ORDER BY seccion_orden ASC', condicion, function(err, rows){        
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