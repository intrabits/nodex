/*
Controlador de galerías
*/

var Pagina = require('./pagina.queries');

exports.create = function (req,res) {
  var usuario_id = req.user.usuario_id;
  var pagina_id  = req.params.pagina_id;
  Pagina.owner(usuario_id, pagina_id, function (err, data) {
      if (err) {console.log(err);}
      else{
          var gal = {
              galeria_usuario_id:     usuario_id,
              galeria_pagina_id:      pagina_id,
              galeria_nombre:         sanitizer.sanitize(req.body.galeria_nombre),
              galeria_descripcion:    sanitizer.sanitize(req.body.galeria_descripcion)
          };
          Pagina.addGaleria(gal, function( err, data){
              if (err) {
                  // error handling code goes here
                  console.log("ERROR : ",err);
              } else {
                  // code to execute on data retrieval
                  res.json(data);
              }
          });
      }
  });
};

exports.show = function (req, res){
    var usuario_id = req.user.usuario_id;
    var galeria_id  = req.params.galeria_id;


    Pagina.getGaleria(galeria_id, function( err, data){
        if (err) {
            console.log("ERROR : ",err);
            res.json('error');
        } else {
            res.json(data);
        }
    });

};

exports.update = function (req, res){
    var usuario_id = req.user.usuario_id;
    var galeria_id = req.params.galeria_id;
    var pagina_id  = req.params.pagina_id;
    var datos = {
        galeria_nombre:     sanitizer.sanitize(req.body.galeria_nombre),
        galeria_descripcion:sanitizer.sanitize(req.body.galeria_descripcion)
    };

    Pagina.owner(usuario_id,pagina_id,function (err, data) {
        if (err) {console.log(err);}
        else{
            Pagina.updateGaleria(galeria_id,datos, function( err, data){
                if (err) {
                    // error handling code goes here
                    console.log("ERROR : ",err);
                } else {
                    // code to execute on data retrieval
                    res.json(data);
                }
            });
        }
    });

};

exports.imagenes = function (req, res){
    var usuario_id = req.user.usuario_id;
    var galeria_id = req.params.galeria_id;
    var pagina_id  = req.params.pagina_id;
    Pagina.getImagenes(galeria_id, function (err,data) {
        if (err) {console.log(err);
            res.send(500,"Ops, algo salió mal");
        } else{
            res.json(data);
        }
    });

};

exports.updateImagen = function (req, res){
    var usuario_id  = req.user.usuario_id;
    var imagen_id   = req.params.imagen_id;
    var datos = {
        imagen_titulo:      sanitizer.sanitize(req.body.imagen_titulo),
        imagen_descripcion: sanitizer.sanitize(req.body.imagen_descripcion)
    };


    Pagina.updateImagen(datos,imagen_id,usuario_id, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);
            res.send(500);
        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
};

exports.deleteImagen = function (req,res) {
  Pagina.deleteImagen(req.params.imagen_id,req.user.usuario_id,function (err,data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminarl la imagen');
    } else {
      res.send('Imagen eliminada');
    }
  });
};
