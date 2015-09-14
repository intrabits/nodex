var express = require('express');
var router  = express.Router();
var fs = require('fs');
var busboy = require('connect-busboy');
var async   = require('async');
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');


//  Modelos
var Usuario = require('./../models/usuario.js');
var Pagina  = require('./../models/pagina.js');
var Pago    = require('./../models/pago.js');
var Soporte = require('./../models/soporte.js');
var Imagen  = require('./../models/imagen.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
var gm      = require('gm').subClass({ imageMagick: true });
var moment = require('moment');



//  Controladores
var PaginaCtrl      = require('./../api/pagina');
var SoporteCtrl     = require('./../routes/soporte.js');
var UsuarioCtrl     = require('./../routes/usuario.js');
// var ProductoCtrl    = require('./../routes/producto.js');
var ProductoCtrl    = require('./../api/productos');
var PublicacionCtrl = require('./../api/pagina/publicacion.routes');
var AdminCtrl       = require('./../routes/admin.js');


/*=========================   Usuario  ====================*/

router.get('/cuenta', ensureAuthenticated, function(req, res){res.json(req.user);  });


router.post('/upload/:pagina_id',ensureAuthenticated, function(req, res) {

    //  Revisamos que el usuario actual tenga permisos sobre la página
    console.log(req.params.pagina_id);
    Pagina.owner(req.user.usuario_id,req.params.pagina_id,function (err, data) {
        if (err) {console.log(err);}
        else{
            pagina_id = req.params.pagina_id;
            var fstream;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldname, file, filename) {
                console.log("Uploading: " + filename);
                var ruta = 'public/websites/'+ pagina_id + '/' + filename;
                fstream = fs.createWriteStream(ruta);
                file.pipe(fstream);
                fstream.on('close', function () {
                    Imagen.save({
                        imagen_titulo       :req.body.imagen_nombre,
                        imagen_usuario_id   :req.user.usuario_id,
                        imagen_pagina_id    :pagina_id,
                        imagen_ruta         :ruta
                    },function (err, data) {
                        if (err) {console.log(err);}
                        else{
                            console.log("Imágen guardada en BD");
                        }
                    });
                    res.redirect('back');
                });
            });
        }
    });
});


router.post('/upload', ensureAuthenticated,function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/upload/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

/*========================   Admin    ============================*/

router.use('/admin/',AdminCtrl);


/*========================   Usuario  ============================*/

router.use('/usuario/',UsuarioCtrl);

/*========================   Páginas  ============================*/

router.use('/pagina/',PaginaCtrl);

router.use('/publicaciones/',PublicacionCtrl);

/*========================   Soporte  ============================*/

router.use('/soporte/',SoporteCtrl);

/*========================   Tienda   ============================*/

router.use('/producto/',ProductoCtrl);

/*========================   Pagos    ============================*/

router.get('/pagos',ensureAuthenticated, function (req,res) {
    var condicion = {
        pago_usuario_id: req.user.usuario_id,
    };

    Pago.getAll(condicion, function ( err, data) {
        if (err) {
            console.log('Error',err);
        }else{
            res.json(data);
        }
    });
});

/*========================   Market   ============================*/






module.exports = router;
