var Pagina = require('./pagina.queries');
var Imagen 	= require('./../../models/imagen.js');
var colors = require('colors');
var gm      = require('gm').subClass({ imageMagick: true });
var fs 		= require('fs');
var moment = require('moment');
var sanitizer = require('sanitizer');
var lwip = require('lwip');

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
  Pagina.getPublicacionPaginaAsync(req.params.id)
    .then(function (pagina_id) {
      var fstream;
      req.pipe(req.busboy);
      req.busboy.on('file',function (fieldname, file, filename, encoding, mimetype) {

          console.log(mimetype);
          var path = req.params.id; // este será el nombre del archivo
          var path_thumb = 'public/websites/thumbs/'+req.params.id;
          switch (mimetype) {
            case 'image/png':
              path+='.png';
              path_thumb += '.png';
              break;
            case 'image/jpeg':
              path+='.jpg';
              break;
            default:
          }
          if (mimetype=='image/png'||mimetype=='image/jpeg'){

          }else{
            console.log('Tipo de archivo no válido');
            return ;
          }

          var ruta = 'public/websites/paginas/'+ pagina_id + '/' + path;
          var ruta_corta = pagina_id + '/' + path;
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
                return Pagina.imgPublicacionAsync(ruta_corta,req.params.id);
              })
              .then(function (data) {
                res.json('Imagen procesada correctamente');

                // Esto es para generar el thumbnail :)
                console.log(ruta);
                setTimeout(function () {
                  lwip.open(ruta, function(err, image){
                      // var ratio = 300 / image.width();
                      // .resize(image.width()/3,image.height()/3)
                      if (err) return console.error(err);
                      if (image) {
                        // Primer borramos el archivo :)
                        try {
                          image.batch()
                            .crop(0,0,150,150)
                            .blur(1)
                            .writeFile(path_thumb, function(err){
                              if (err) console.trace(err);
                              else console.log('Thumbnail generado en: ' + path_thumb);
                            });
                        } catch (e) {
                          console.error(e);
                        }        


                      }
                    });
                }, 7000);


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
