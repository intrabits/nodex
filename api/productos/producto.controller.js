var Producto = require('./producto.queries');
var colors = require('colors');

exports.delete = function (req,res) {
  console.log('Eliminando producto'.yellow);
  Producto.deleteAsync(req.params.producto_id,req.user.usuario_id)
    .then(function (data) {
      res.send('Producto eliminado correctamente');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Ocurrió un error al eliminar el producto');
    });
};
