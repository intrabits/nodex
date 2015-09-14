var express = require('express');
var router  = express.Router();
var async   = require('async');
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');


var moment = require('moment');

//	Mo
var Pagina  = require('./../api/pagina/pagina.queries');
var Imagen 	= require('./../models/imagen.js');


router.get('/mensajes/latest',auth.isLogged, function (req, res){
    var usuario_id = req.user.id;

    Pagina.getMensajesLatest(usuario_id,function( err, data){
        if (err) {
            console.error(err);
            res.status(500).send('Error al cargar los mensajes');
        } else {
            res.json(data);
        }
    });

} );

router.get('/correo/:pagina_id',function (req,res) {
    console.log(req.params.pagina_id);
    res.send(req.params.pagina_id);
});


router.get('/mensajes/unread',auth.isLogged, function (req, res){
    var usuario_id = req.user.id;

    Pagina.getMensajesPaginas(usuario_id,function( err, data){
        if (err) {
            console.error(err);
            res.status(500).send('Error al cargar los mensajes sin leer');
        } else {
            res.json(data);
        }
    });

} );


router.get('/:pagina_id/mensajes',auth.isLogged, function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;


    Pagina.getMensajes(pagina_id, function( err, data){
        if (err) {
          console.error(err);
            res.status(500).send('Error al cargar los mensajes');
        } else {
            res.json(data);
        }
    });

} );

router.get('/:pagina_id/mensajes/stats/',auth.isLogged, function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;


    Pagina.getMensajesStats(pagina_id, function( err, data){
        if (err) {
            console.log("ERROR : ",err);
            res.json('error');
        } else {
            res.json(data);
        }
    });

} );

router.get('/:pagina_id/mensaje/:mensaje_id',auth.isLogged, function (req, res){
    var usuario_id = req.user.id;
    var mensaje_id  = req.params.mensaje_id;

    // FIXME esta ruta está mal!! deberíamos quitar el ID de la página
    Pagina.getMensaje(mensaje_id, function( err, data){
        if (err) {
            console.error(err);
            res.status(500).send('Error al cargar el mensaje');
        } else {

            Pagina.mensajeLeido(mensaje_id, function (err) {
                if (err) {console.log(err);}
                else{
                    res.json(data);
                }
            })
        }
    });

} );

module.exports = router;
