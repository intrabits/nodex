var Producto = require('./producto.queries');
var colors = require('colors');

exports.show = function (req,res) {
      Producto.getProducto(req.params.id,function( err, data){
          if (err) {
            res.status(500).send('Error al cargar el producto');
            console.error(err);
          }

          res.json(data);
      });
};

exports.delete = function (req,res) {
  console.log('Eliminando producto ',colors.yellow(req.params.id));
  Producto.deleteAsync(req.params.id,req.user.id)
    .then(function (data) {
      res.send('Producto eliminado correctamente');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Ocurrió un error al eliminar el producto');
    });
};
