
var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var async   = require('async');
var busboy  = require('connect-busboy');
var config  = require('./../../config');
var auth    = require('./../../config/auth.js');

var ProductoCtrl = require('./producto.controller');

//  Modelos
var Producto = require('./producto.queries');
var Pagina = require('./../../models/pagina.js');

//  Librerías
var gm      = require('gm').subClass({ imageMagick: true });
var moment = require('moment');
var sanitizer = require('sanitizer');

router.delete('/:id',ProductoCtrl.delete);

router.get('/pagina/:pagina_id',function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;

    Producto.misProductos(pagina_id,function( err, data){
        if (err) {
            console.error(err);
            res.status(500).send('Error al cargar los productos');
        } else {
            res.json(data);
        }
    });
});

router.get('/categorias',function (req, res){
    Producto.getCategorias(function( err, data){
        if (err) {
            // error handling code goes here
            console.error(err);
            res.status(500).send('Error al cargar categorías');
        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
});


router.get('/:producto_id',function (req, res){
    Producto.getProducto(req.params.producto_id,function( err, data){
        if (err) {
          res.status(500).send('Error al cargar el producto');
          console.error(err);
        }

        res.json(data);
    });
});

router.put('/:producto_id',function (req, res){
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
});

router.delete('/:producto_id',auth.isLogged,function  (req,res) {
    Producto.delete( req.params.producto_id,req.user.user_id,function  (err,data) {
        if (err) {
            console.error(err);
            res.status(500).send('Ocurrió un error al eliminar el producto');
        }

        res.json(data);
    });
});

router.delete('/imagen/:imagen_id',auth.isLogged,function  (req,res) {

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
});

router.get('/:producto_id/imagenes',function (req, res){
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
});

router.post('/:producto_id/upload', auth.isLogged,function(req, res) {
    async.waterfall([
        function (callback) {
            Producto.owner(req.user.id,req.params.producto_id,function (err,data) {
                if (err) {
                    callback(err, null);
                } else{
                    if (data) {
                        callback(null,req.params.producto_id,data);
                    }

                }
            });
        },
        function(producto_id,pagina_id,callback){
            var fstream;
            try {
                req.pipe(req.busboy);
                req.busboy.on('file',function (fieldname, file, filename) {
                    var date = moment().format('YYYY-MM-DD_HH-mm-ss');
                    var name = date + '_' + filename;

                    var ruta = 'public/websites/paginas/'+ pagina_id + '/' + name;
                    var ruta_corta = pagina_id + '/' + name;
                    fstream = fs.createWriteStream(ruta);
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        Producto.imagen({
                            imagen_usuario_id   :req.user.id,
                            imagen_url         :ruta_corta,
                            imagen_producto_id  :producto_id
                        },function (err, data) {
                            if (err) {
                                callback(err, null);
                            }else{
                                console.log("Imágen guardada... teóricamente");
                                callback(null,ruta_corta);

                            }
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
        res.status(500).send('Error al subir la imagen');
       } else{
        console.log('Todo bien ' + result);
        res.json('ok');
       }
    });

});



router.post('/pagina/:pagina_id/add',auth.isLogged, function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;
    var datos = {
        producto_nombre:      sanitizer.sanitize(req.body.producto_nombre),
        producto_descripcion: sanitizer.sanitize(req.body.producto_descripcion),
        producto_precio:      sanitizer.sanitize(req.body.producto_precio),
        producto_usuario_id:usuario_id,
        producto_pagina_id: req.params.pagina_id,
        producto_categoria_id:   sanitizer.sanitize(req.body.categoria.categoria_id)
    };
    console.log(req.body.categoria);
    async.waterfall([
        function(callback){
            //  Revisamos que el usuario sea el dueño de la página
            Pagina.owner(usuario_id,pagina_id,function (err, data) {
                if (err) {
                    callback(err);
                } else{
                    if (data) {
                        callback(null,data);
                    } else{
                        callback('No eres el dueño ¬¬',null);
                    }

                }
            });
        },
        function(data, callback){
            if (data) {
                //  Si el usuario es el dueño entonces insertamos el producto... yeah!

                console.log(datos);
                Producto.save(datos, function (err, data) {
                    if (err) {
                        callback(err);
                    } else{
                        callback(null,data);
                    }
                });
            }
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Error al agregar el producto');
        }else{
            console.log("Prooducto agregado");
            console.log(result);
            res.send(result);
        }
    });

} );




module.exports = router;
