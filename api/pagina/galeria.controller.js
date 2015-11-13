/*
Controlador de galerías
*/

var Pagina = require('./pagina.queries');
var Promise = require('bluebird');
var sanitizer = require('sanitizer');
var shortId = require('shortid');
var fs = require('fs');
var gm      = require('gm').subClass({ imageMagick: true });

Pagina = Promise.promisifyAll(Pagina);

exports.list = function (req,res) {
  Pagina.getGalerias(req.params.pagina_id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al cargar las galerías de la página');
    });
};


exports.create = function (req,res) {
  var usuario_id = req.user.id;
  var pagina_id  = req.params.pagina_id;



  Pagina.ownerAsync(usuario_id,pagina_id)
    .then(function () {
      console.log('creando página...');
      var gal = {
          galeria_usuario_id:     usuario_id,
          galeria_pagina_id:      pagina_id,
          galeria_nombre:         sanitizer.sanitize(req.body.galeria_nombre),
          galeria_descripcion:    sanitizer.sanitize(req.body.galeria_descripcion)
      };
      return Pagina.addGaleriaAsync(gal);
    })
    .then(function (data) {
      console.log(req.user.nombre,' creó una galería');
      res.json(data);
    })
    .catch(function (err) {
      console.trace(err);
      res.status(500).send('Error al crear la galería');
    });

};

exports.show = function (req, res){
    var usuario_id = req.user.usuario_id;
    var galeria_id  = req.params.galeria_id;


    Pagina.getGaleria(galeria_id, function( err, data){
        if (err) {
            console.error(err);
            res.status(500).send('Error al cargar la galería');
        } else {
            res.json(data);
        }
    });

};

exports.update = function (req, res){
    var usuario_id = req.user.id;
    var galeria_id = req.params.galeria_id;
    var pagina_id  = req.params.pagina_id;
    var datos = {
        galeria_nombre:     sanitizer.sanitize(req.body.galeria_nombre),
        galeria_descripcion:sanitizer.sanitize(req.body.galeria_descripcion)
    };

    Pagina.ownerAsync(usuario_id,pagina_id)
      .then(function () {

        return Pagina.updateGaleriaAsync(galeria_id,datos);
      })
      .then(function (data) {
        res.send('Galería actualizada');
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error al actualizar');
      });


};

exports.imagenes = function (req, res){
    var usuario_id = req.user.usuario_id;
    var galeria_id = req.params.galeria_id;
    var pagina_id  = req.params.pagina_id;
    Pagina.getImagenes(galeria_id, function (err,data) {
        if (err) {
          console.error(err);
          res.status(500).send('Error al cargar las imágenes');
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
            console.error(err);
            res.status(500).send('Error al actualizar');

        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
};

// TODO eliminar galería
exports.delete = function (req,res) {

};

exports.deleteImagen = function (req,res) {
  Pagina.deleteImagen(req.params.imagen_id,req.user.id,function (err,data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminarl la imagen');
    } else {
      res.send('Imagen eliminada');
    }
  });
};

exports.upload = function (req,res) {



  var fstream;
  var pagina_id = req.params.pagina_id;
  var galeria_id = req.params.galeria_id;


  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      var name = shortId.generate() + filename;
      var base = 'public/websites/paginas/';
      var path = req.params.pagina_id+'/img/' + name;

      console.log("Uploading: " + filename);
      try {
          fstream = fs.createWriteStream(base + path);
          file.pipe(fstream);
          fstream.on('close', function () {
              gm(base + path)
                .gravity('Center')
                .write(base + path, function (error) {
                  if (error) {
                    console.error(error);
                    res.status(500).send('Error al subir la imagen');
                  } else {

                      var data = {
                          imagen_usuario_id:  req.user.id,
                          imagen_galeria_id:  galeria_id,
                          imagen_url:         path
                      };
                      Pagina.addImagen(data,function (err, data) {
                          if (err) {
                            res.status(500).send('Error al guardar la imagen');
                            console.log(err);
                          } else{
                              console.log("imagen recortada y guardada");
                              res.send('Imagen recortada y guardada');
                          }
                      });
                  }
                });



          });
      } catch (e) {
          console.log(e);
          res.status(500).send('Error al guardar la imagen');
      }

  });

};
