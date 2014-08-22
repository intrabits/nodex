var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var async   = require('async');
var busboy  = require('connect-busboy');
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;

//  Modelos
var Producto = require('./../models/producto.js');
var Pagina = require('./../models/pagina.js');

//  Librerías
var gm      = require('gm').subClass({ imageMagick: true });
var moment = require('moment');


router.get('/pagina/:pagina_id',function (req, res){
    var usuario_id = req.user.usuario_id;
    var pagina_id  = req.params.pagina_id;  
    Pagina.owner(usuario_id,pagina_id,function (err,data) {
        if (err||!data) {
            console.log(err);
            res.send(500);
        };
    });
    Producto.misProductos(pagina_id,function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/categorias',function (req, res){
    Producto.getCategorias(function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});


router.get('/:id',function (req, res){
    Producto.getProducto(req.params.id,function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/:producto_id/imagenes',function (req, res){
    Producto.getImagenes(req.params.producto_id,function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.post('/:producto_id/upload', ensureAuthenticated,function(req, res) {
    async.waterfall([
        function (callback) {            
            Producto.owner(req.user.usuario_id,req.params.producto_id,function (err,data) {
                if (err) {
                    callback(err, null);
                } else{
                    if (data) {
                        callback(null,req.params.producto_id,data);
                    };
                    
                };
            });
        },
        function(producto_id,pagina_id,callback){            
            var fstream;
            try {
                req.pipe(req.busboy); 
                req.busboy.on('file',function (fieldname, file, filename) {                
                    var date = moment().format('YYYY-MM-DD_HH:mm:ss');
                    var name = req.user.usuario_id+"_"+ date +".png";
            
                    var ruta = 'public/websites/paginas/'+ pagina_id + '/' + name;
                    var ruta_corta = pagina_id + '/' + name;
                    fstream = fs.createWriteStream(ruta);
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        Producto.imagen({                            
                            imagen_usuario_id   :req.user.usuario_id,                            
                            imagen_url         :ruta_corta,
                            imagen_producto_id  :producto_id
                        },function (err, data) {
                            if (err) {                            
                                callback(err, null)
                            }else{
                                console.log("Imágen guardada... teóricamente");
                                callback(null,ruta_corta);                            
                                                                               
                            };
                        });                    
                    });

                });
                
            } catch (e) {
                callback(e,null);
            }
        }
    ], function (err, result) {       
       if (err) {
        console.log(err);
        res.send(500);
       } else{
        console.log("TOdo bien"+result);
        res.json('ok');
       };
    });
   
});



router.post('/pagina/:pagina_id/add',ensureAuthenticated, function (req, res){
    var usuario_id = req.user.usuario_id;
    var pagina_id  = req.params.pagina_id;    
    var datos = {
        producto_nombre:    req.body.producto_nombre,
        producto_descripcion: req.body.producto_descripcion,
        producto_precio:    req.body.producto_precio,
        producto_usuario_id:usuario_id,
        producto_pagina_id: req.params.pagina_id,
        producto_categoria_id:   req.body.categoria.categoria_id
    }
    console.log(req.body.categoria);
    async.waterfall([
        function(callback){
            //  Revisamos que el usuario sea el dueño de la página
            Pagina.owner(usuario_id,pagina_id,function (err, data) {
                if (err) {
                    callback(err,null);
                } else{
                    if (data) {
                        callback(null,data);    
                    } else{
                        callback('No eres el dueño ¬¬',null);
                    };
                    
                };
            })            
        },
        function(data, callback){
            if (data) {
                //  Si el usuario es el dueño entonces insertamos el producto... yeah!
                
                console.log(datos);
                Producto.save(datos, function (err, data) {
                    if (err) {
                        callback(err,null);
                    } else{
                        callback(null,data);
                    };
                });
            };            
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
            res.send(500);
        }else{
            console.log("Prooducto agregado");
            console.log(result);
            res.send(result);
        };
    });
    
} );




module.exports = router;
