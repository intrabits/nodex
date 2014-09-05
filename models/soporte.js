var config  = require('../config/config.js');
connection = config.connection;


var Soporte = {};

Soporte.addMensaje = function  (data, callback) {
	connection.query('INSERT INTO chat SET ?', data, function(err, rows){        
        if (err) 
            callback(err,null);
        else
            callback(null,rows[0]);
    }); 
}

Soporte.getFaqCategorias = function(callback){
	connection.query('SELECT c.categoria_id,c.categoria_nombre, COUNT(f.faq_id) AS categoria_cantidad FROM faq_categoria c LEFT JOIN faq f ON c.categoria_id=f.faq_categoria_id GROUP BY c.categoria_id', function(err, rows){        
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

Soporte.getFaqs = function(categoria_id,callback){
	connection.query('SELECT * from faq where faq_categoria_id = ?',categoria_id , function(err, rows){        
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

Soporte.getFaq = function(faq_id,callback){
	connection.query('SELECT * from faq where faq_id = ?',faq_id , function(err, rows){        
		if (err) 
			callback(err,null);
		else
			if (rows[0]==undefined) {
				callback(null,null);
			}else{
				callback(null,rows[0]);				
            }
    });
}

module.exports = Soporte;