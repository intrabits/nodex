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


module.exports = PaginaCtrl;