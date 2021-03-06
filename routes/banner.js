var express = require('express');
var router  = express.Router();
var async   = require('async');
var fs 		= require('fs');
var auth    = require('./../config/auth.js');
var sanitizer = require('sanitizer');
var gm      = require('gm').subClass({ imageMagick: true });
var moment  = require('moment');


var Pagina = require('./../api/pagina/pagina.queries');



router.get('/:pagina_id',auth.isLogged,function (req,res) {
  Pagina.getBanners(req.params.pagina_id,function (err,data) {
    if (err) {
      res.status(500).send('Error al cargar los banners');
      console.error(err);
    } else {
      res.json(data);
    }
  });
});

router.delete('/:pagina_id',auth.isLogged,function (req,res) {
  Pagina.deleteBanner(req.params.pagina_id,function (err,data) {
    if (err) {
      res.status(500).send('Error al eliminar el banenr');
      console.error(err);
    } else {
      res.json("Banner eliminado");
    }
  });
});

router.put('/:pagina_id',auth.isLogged,function (req,res) {
  var data = {
    banner_texto:     sanitizer.sanitize(req.body.banner_texto),
    banner_url:       sanitizer.sanitize(req.body.banner_url)
  };
  Pagina.updateBanner(data,req.params.pagina_id,function (err,data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error al editar el banner');
    } else {
      res.json("Banner editado correctamente");
    }
  });
});

//  Crear banner y asignarlo a una página
router.post('/pbanner/:pagina_id',auth.isLogged,function (req,res) {

  console.log("Subiendo banner");

  var fstream;
  var date = moment().format('YYYY-MM-DD_HH:mm:ss');
  req.pipe(req.busboy);
  try {

    var pagina_id = req.params.pagina_id;
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log("mimetype:");
        console.log(mimetype);
        var name = req.params.tipo+"_"+date +".png";
        if (mimetype=='image/png'||mimetype=='image/jpeg') {
            var ruta = 'public/websites/paginas/'+ pagina_id + '/img/' + name;
            var ruta_corta = pagina_id + '/img/' + name;
            fstream = fs.createWriteStream(ruta);
            file.pipe(fstream);
            fstream.on('close', function () {
              var banner = {
                // banner_texto: sanitizer.sanitize(req.body.banner_text),
                // banner_url:   sanitizer.sanitize(req.body.banner_url),
                banner_pagina_id:sanitizer.sanitize(pagina_id),
                banner_img:   sanitizer.sanitize(ruta_corta),
                banner_usuario_id:req.user.id
              };
              Pagina.addBanner(banner,function (err,data) {
                if (err) {
                  console.error(err);
                  res.status(500).send('Error al guardar el banner');
                } else {
                  res.json("Banner guardado exitosamente");
                }
              });
            });
            fstream.on('error', function(err) {
              console.error(err);
              res.status(500).send('Error al subir el archivo');
            });
        }else{
            console.log("Alguien intentó subir un archivo inválido");
            res.status(500).send('Archivo inválido');
        }

    });

  } catch (e) {
      console.error(e);
      res.status(500).send('Ocurrió un error al subir el archivo');
  }
});



module.exports = router;
