// TODO: Sequelize Model
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


// Agregar un nuevo producto :)
router.post('/',ProductoCtrl.create);

// detalles de un producto
router.get('/:id',ProductoCtrl.show);

// eliminar producto
router.delete('/:id',auth.isLogged,ProductoCtrl.delete);

// TODO: mandar esto a páginas: api/paginas/123/productos
router.get('/pagina/:pagina_id',ProductoCtrl.pagina);

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

// actualizar un producto
router.put('/:producto_id',auth.isLogged,ProductoCtrl.update);

// Eliminar una imágen de la gelería interna del producto
router.delete('/imagen/:imagen_id',auth.isLogged,ProductoCtrl.deleteImagen);

router.get('/:producto_id/imagenes',ProductoCtrl.imagenes);

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


module.exports = router;
