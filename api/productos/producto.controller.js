var Producto = require('./producto.queries');
var Pagina = require('./../pagina/pagina.queries');
var colors = require('colors');
var sanitizer = require('sanitizer');

exports.show = function (req,res) {
      Producto.getProducto(req.params.id,function( err, data){
          if (err) {
            res.status(500).send('Error al cargar el producto');
            console.error(err);
          }

          res.json(data);
      });
};

exports.update = function (req, res){
    var data = {
        producto_nombre :      sanitizer.sanitize(req.body.producto_nombre),
        producto_descripcion:  sanitizer.sanitize(req.body.producto_descripcion),
        producto_precio:       sanitizer.sanitize(req.body.producto_precio)
    };
    Producto.update(data,req.params.producto_id,function( err, data){
        if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar el producto');
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

exports.create = function (req,res) {

  console.log('Agregando producto a la tienda'.yellow);
  Pagina.isOwnerAsync({
    usuario_id:req.user.id,
    pagina_id:req.body.pagina_id
  })
    .then(function () {


      var data = {
        producto_nombre: sanitizer.sanitize(req.body.producto_nombre),
        producto_descripcion: sanitizer.sanitize(req.body.producto_descripcion),
        producto_precio: sanitizer.sanitize(req.body.producto_precio),
        producto_usuario_id:req.user.id,
        producto_pagina_id: req.body.pagina_id
      };
      return Producto.saveAsync(data);
    })
    .then(function (data) {
      console.log(data);
      res.json({
        result:'Producto agregado correctamente',
        id:data
      });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al agregar el producto');
    });
};

exports.pagina = function (req, res){

    var pagina_id  = req.params.pagina_id;

    console.log('Cargando los productos de la página ' + pagina_id);

    Producto.paginaAsync(pagina_id)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error al cargar los productos');
      });
};

exports.imagenes = function (req, res){
    Producto.getImagenes(req.params.producto_id,function( err, data){
        if (err) {
            // error handling code goes here
            console.error(err);
            res.status(500).send('Error al cargar las imágenes');
        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
};

exports.deleteImagen = function (req,res) {
  Producto.deleteImagen( req.params.imagen_id,req.user.id,function  (err,data) {
      if (err) {
          console.error(err);
          res.status(500).send('Error al eliminar');
      } else{
          console.log(req.params.imagen_id);
          console.log("Borrando imagen");
          res.json('Imagen eliminada');
      }
  });
};
