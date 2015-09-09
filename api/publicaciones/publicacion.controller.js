var Pagina = require('./../../models/pagina');
var colors = require('colors');

exports.index = function (req,res) {
  var usuario_id = req.user.usuario_id;
  var pagina_id  = req.params.pagina_id;


  Pagina.getPublicaciones(pagina_id, function( err, data){
      if (err) {
          // error handling code goes here
          console.error(err);
          res.status(500).send('Error al cargar las publicaciones');
      } else {
          res.json(data);
      }
  });
};

exports.delete = function (req,res) {
  console.log('Eliminando publicación'.yellow);
  Pagina.deletePublicacionAsync(req.params.id)
    .then(function (data) {
      res.send('Publicación elimianda');
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error al eliminal la publicación');
    });


};
