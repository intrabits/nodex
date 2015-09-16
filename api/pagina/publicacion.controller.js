var Pagina = require('./pagina.queries');
var Imagen 	= require('./../../models/imagen.js');
var colors = require('colors');
var gm      = require('gm').subClass({ imageMagick: true });
var fs 		= require('fs');
var moment = require('moment');
var sanitizer = require('sanitizer');

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

exports.imagen = function (req,res) {
  console.log('Subiendo imagen para una publicación'.yellow);
  Pagina.getPublicacionPaginaAsync(req.params.publicacion_id)
    .then(function (pagina_id) {
      var fstream;
      req.pipe(req.busboy);
      req.busboy.on('file',function (fieldname, file, filename, encoding, mimetype) {

          console.log(mimetype);
          if (mimetype=='image/png'||mimetype=='image/jpeg'){

          }else{
            console.log('Tipo de archivo no válido');
            return ;
          }

          var date = moment().format('YYYY-MM-DD_HH:mm:ss');
          var name = req.user.id+"_"+ date +".png";

          var ruta = 'public/websites/paginas/'+ pagina_id + '/' + name;
          var ruta_corta = pagina_id + '/' + name;
          fstream = fs.createWriteStream(ruta);
          file.pipe(fstream);
          fstream.on('close', function () {
            console.log('Archivo subido correctamente, procedemos a guardar la imagen');
            Imagen.saveAsync({
                  imagen_titulo       :req.params.publicacion_id+'_foto',
                  imagen_usuario_id   :req.user.id,
                  imagen_pagina_id    :pagina_id,
                  imagen_ruta         :ruta_corta
              })
              .then(function (ruta) {
                console.log('Asignando imagen a la publicación');
                return Pagina.imgPublicacionAsync(ruta_corta,req.params.publicacion_id);
              })
              .then(function (data) {
                res.json('Imagen procesada correctamente');
              })
              .catch(function (err) {
                console.error(err);
                res.status(500).send('Error al subir el archivo');
              });
          });

      });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send('Error al subir el archivo');
    });
};

exports.update = function (req,res) {




  Pagina.getPublicacionPaginaAsync(req.params.id)
    .then(function (pagina_id) {

      return Pagina.ownerAsync(req.user.id,pagina_id);

    })
    .then(function (data) {
      if (data) {
        var datos = {
            publicacion_titulo:   sanitizer.sanitize(req.body.publicacion_titulo),
            publicacion_video:    sanitizer.sanitize(req.body.publicacion_video),
            publicacion_contenido:req.body.publicacion_contenido
        };
        var publicacion_id  = req.params.id;

        return Pagina.updatePublicacionAsync(publicacion_id,datos);
      }

    })
    .then(function (data) {
      res.send('Publicación actualizada');
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Error al actualizar la publicación');
    });
  
};
