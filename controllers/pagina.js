var Pagina  = require('./../models/pagina.js');

var PaginaCtrl = {}


PaginaCtrl.deletePagina = function (req, res) {
	id = req.params.id;
	Pagina.deletePagina(id,function (err, data) {
		if (err) {
			console.log(err);
		} else{
			res.send('Ok');
		};
	})
}

PaginaCtrl.deleteSeccion = function (req, res) {
	id = req.params.id;
	Pagina.deleteSeccion(id,function (err, data) {
		if (err) {
			console.log(err);
		} else{
			res.send('Ok');
		};
	})
}

PaginaCtrl.misPaginas = function(req, res){
	   var condicion = {'usuario_id':req.user[0].usuario_id};    
    Pagina.getPaginas(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
}


module.exports = PaginaCtrl;