var express = require('express');
var router  = express.Router();
var fs 		= require('fs');
var async   = require('async');
var busboy 	= require('connect-busboy');
var config  = require('./../../config/config.js');
var auth    = require('./../../config/auth');


var gm      = require('gm').subClass({ imageMagick: true });
var moment  = require('moment');
var sanitizer = require('sanitizer');
var Lib     = require('./../../lib/index.js');


var webfaction = config.webfaction;
//	Modelos
var Pagina  = require('./../../models/pagina.js');
var Imagen 	= require('./../../models/imagen.js');
var Usuario = require('./../../models/usuario.js');

//  Controladores
var MensajesCtrl       = require('./../../routes/mensaje.js');
var BannersCtrl        = require('./../../routes/banner.js');
var PaginaCtrl = require('./pagina.controller');
var GaleriaCtrl = require('./galeria.controller');
var PublicacionCtrl = require('./publicacion.controller');



/*----------------------------------    Banners    --------------------------------------*/

router.use('/banners/',BannersCtrl);

//  Traer Paquetes de NODEX
router.get('/paquetes/',auth.isLogged,PaginaCtrl.paquetes);

router.post('/:pagina_id/upload/:tipo', auth.isLogged,function(req, res) {

    //  Revisamos que el usuario actual tenga permisos sobre la página
    Pagina.owner(req.user.usuario_id,req.params.pagina_id,function (err, data) {
        if (err) {console.log(err);res.send(500);}
        if (data){
            pagina_id = req.params.pagina_id;
            var fstream;
            var date = moment().format('YYYY-MM-DD_HH:mm:ss');
            req.pipe(req.busboy);
            try {
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
                                Imagen.save({
                                    imagen_titulo       :'Logotipo',
                                    imagen_usuario_id   :req.user.usuario_id,
                                    imagen_pagina_id    :pagina_id,
                                    imagen_ruta         :ruta_corta
                                },function (err, data) {
                                    if (err) {
                                        console.log(err);
                                        res.send(500);
                                    }else{
                                        var tipo = req.params.tipo;
                                        console.log(tipo);
                                        if (tipo=='logo') {
                                            Imagen.logo(ruta_corta,pagina_id,function (err) {
                                                if (err) {console.log(err);res.send(500);}else{res.json('ok');} });
                                        }
                                        if (tipo=='portada') {
                                            Imagen.portada(ruta_corta,pagina_id,function (err) {
                                                if (err) {console.log(err);res.send(500);}else{res.json('ok');} });
                                            var banner = {
                                              banner_texto: sanitizer.sanitize(req.body.banner_text),
                                              banner_url:   sanitizer.sanitize(req.body.banner_url),
                                              banner_img:   ruta_corta
                                            };
                                            Pagina.addBanner();
                                        }
                                        if (tipo=='fondo') {
                                            //  Primero checamos su tamaño
                                            gm(ruta)
                                                .size(function (err, size) {
                                                  if (!err){
                                                    //  Si es muy grande la recortamos
                                                    if (size.width>1600) {
                                                        gm(ruta)
                                                            .resize(1600)
                                                            .write(ruta,function  (err) {
                                                                if (err) {
                                                                    console.log(err);res.send(500);
                                                                } else{
                                                                    console.log("Recortada correctamente");
                                                                    Imagen.fondo(ruta_corta,pagina_id,function (err) {
                                                                        if (err) {console.log(err);res.send(500);}
                                                                        else{res.json('ok');} });
                                                                }
                                                            });
                                                        }else{
                                                        gm(ruta)
                                                            .write(ruta,function  (err) {
                                                                if (err) {
                                                                    console.log(err);res.send(500);
                                                                } else{
                                                                    Imagen.fondo(ruta_corta,pagina_id,function (err) {
                                                                        if (err) {console.log(err);res.send(500);}
                                                                        else{res.json('ok');} });
                                                                }
                                                            });
                                                        }

                                                    }else{
                                                        console.log(err);
                                                    }

                                                });
                                        }

                                    }
                                    res.redirect('back');
                                });
                            });
                            fstream.on('error', function(err) {
                              console.log("ERROR:" + err);
                            });
                        }else{
                            console.log("Alguien intentó subir un archivo inválido");
                            res.send(500);
                        }

                    });

            } catch (e) {
                console.log(e);
                res.send(500);
            }

        }
    });
});


//  Traer páginas del usuario logueado
router.get('/misPaginas',auth.isLogged,PaginaCtrl.misPaginas);


//  Traer páginas VENCIDAS del usuario logueado
router.get('/vencidas',auth.isLogged,PaginaCtrl.vencidas );
// Cargar los datos de una página
router.get('/:pagina_id',auth.isLogged, PaginaCtrl.show );
// Actualizar una página
router.put('/:pagina_id',auth.isLogged, PaginaCtrl.update );


router.get('/:pagina_id/cuentas',auth.isLogged, PaginaCtrl.cuentas );

router.post('/:pagina_id/cuentas',auth.isLogged,PaginaCtrl.addCuenta);


router.get('/:pagina_id/seguidores',auth.isLogged, function (req, res){
    var usuario_id = req.user.usuario_id;
    var pagina_id  = req.params.pagina_id;
    async.waterfall([
        function(callback){
            Pagina.owner(req.user.usuario_id,req.params.pagina_id,function (err,data) {
                if (err) {
                    console.log(err);
                    callback(err,null);
                } else{
                    if (data) {
                        callback(null,pagina_id);
                    } else{
                        callback('No tienes los permisos necesarios');
                    }
                }
            });
        },
        function(pagina_id,callback){
          // arg1 now equals 'one' and arg2 now equals 'two'
            Pagina.seguidores(pagina_id,function (err,data) {
                if (err) {
                    callback(err,null);
                } else{
                    console.log(data);
                    if (data)
                        callback(null,data);
                    else
                        callback('No hay tal',null);
                }
            });
        },
    ], function (err, result) {
       if (err) {
        console.log(err);
        res.send(500);
       } else{
        res.json(result);
       }
    });
} );


/*----------------------------------    Publicaciones   --------------------------------------*/

router.get('/:pagina_id/publicaciones',auth.isLogged, function (req, res){
    var usuario_id = req.user.usuario_id;
    var pagina_id  = req.params.pagina_id;


    Pagina.getPublicaciones(pagina_id, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);
            res.send(500,"Error al cargar las publicaciones");
        } else {
            res.json(data);
        }
    });

} );

router.get('/:pagina_id/publicacion/:publicacion_id',auth.isLogged,PaginaCtrl.publicacion );

router.get('/publicacion/:publicacion_id/toggle',auth.isLogged,PaginaCtrl.togglePublicacion);

router.delete('/:pagina_id/publicacion/:publicacion_id',auth.isLogged, function (req, res){
    var usuario_id = req.user.usuario_id;
    var publicacion_id  = req.params.publicacion_id;


    Pagina.getPublicacion(publicacion_id, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);
            res.send(400,"Error al borrar la publicación");
        } else {
            res.json(data);
        }
    });

} );

router.post('/:pagina_id/publicaciones',auth.isLogged, function (req, res){
    var usuario_id = req.user.usuario_id;
    var pagina_id  = req.params.pagina_id;
    Pagina.owner(usuario_id, pagina_id, function (err, data) {
        if (err) {console.log(err);}
        else{
            var pub = {
                publicacion_usuario_id:     usuario_id,
                publicacion_pagina_id:      pagina_id,
                publicacion_titulo:         sanitizer.sanitize(req.body.publicacion_titulo),
                publicacion_contenido:      sanitizer.sanitize(req.body.publicacion_contenido),
                publicacion_video:          sanitizer.sanitize(req.body.publicacion_video)
            };
            Pagina.addPublicacion(pub, function( err, data){
                if (err) {
                    // error handling code goes here
                    console.error(err);
                    res.status(500).send('Error al agregar la publicación');
                } else {
                    // code to execute on data retrieval
                    res.json(data);
                }
            });
        }
    });

} );

router.put('/:pagina_id/publicacion/:publicacion_id',auth.isLogged, function (req, res){
    var usuario_id = req.user.usuario_id;
    var publicacion_id  = req.params.publicacion_id;
    var pagina_id = req.params.pagina_id;
    var datos = {
        publicacion_titulo:   sanitizer.sanitize(req.body.publicacion_titulo),
        publicacion_video:    sanitizer.sanitize(req.body.publicacion_video),
        publicacion_contenido:sanitizer.sanitize(req.body.publicacion_contenido)
    };

    Pagina.owner(usuario_id,pagina_id,function (err,data) {
        if (err) {
          res.send(400,"Ops, error");
          console.log(err);}

        if (data){

            if (data===null) {
                console.log("No tiene permisos");
                res.send(400,"Ops, error al guardar la publicación");
            }else{
                Pagina.updatePublicacion(publicacion_id,datos, function( err, data){
                    if (err) {
                        console.log("ERROR : ",err);
                        res.send(400,"Ops, error al guardar la publicación");
                    } else {
                        res.json(data);
                    }
                });
            }
        }
    });

} );




/*----------------------------------    Mensajes   --------------------------------------*/

router.use('/',MensajesCtrl);

/*----------------------------------    Galerías   --------------------------------------*/

router.get('/:pagina_id/galerias', function (req, res){
    var usuario_id = req.user.usuario_id;
    var pagina_id  = req.params.pagina_id;


    Pagina.getGalerias(pagina_id, function( err, data){
        if (err) {
            console.log("ERROR : ",err);
            res.json('error');
        } else {
            res.json(data);
        }
    });

} );

router.post('/:pagina_id/galerias',auth.isLogged,GaleriaCtrl.create);

router.get('/:pagina_id/galeria/:galeria_id',auth.isLogged,GaleriaCtrl.show);

router.put('/:pagina_id/galeria/:galeria_id',auth.isLogged,GaleriaCtrl.update);

router.get('/:pagina_id/galeria/:galeria_id/imagenes',auth.isLogged,GaleriaCtrl.imagenes );

router.post('/:pagina_id/galeria/:galeria_id/upload', auth.isLogged,function(req, res) {
    var fstream;
    var base = "public/websites/paginas/";
    var pagina_id = req.params.pagina_id;
    var galeria_id = req.params.galeria_id;
    var date = moment().format('YYYY-MM-DD_HH:mm:ss');
    var name = req.user.usuario_id+"_"+ date +".png";
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        var path = req.params.pagina_id+'/img/' + name;
        console.log("Uploading: " + filename);
        try {
            fstream = fs.createWriteStream(base + path);
                file.pipe(fstream);
                fstream.on('close', function () {
                    gm(base+path)
                      .gravity('Center')
                      .write(base+ path, function (error) {
                        if (error) console.log('Error - ', error);
                        else {

                            var data = {
                                imagen_usuario_id:  req.user.usuario_id,
                                imagen_galeria_id:  galeria_id,
                                imagen_url:         path
                            };
                            Pagina.addImagen(data,function (err, data) {
                                if (err) {console.log(err);}
                                else{
                                    console.log("imagen recortada y guardada");
                                }
                            });
                        }
                      });


                    res.redirect('back');
                });
        } catch (e) {
            console.log(e);
            res.send(500);
        }

    });
});

router.put('/imagen/:imagen_id',auth.isLogged,GaleriaCtrl.updateImagen);

router.delete('/imagen/:imagen_id',auth.isLogged,GaleriaCtrl.deleteImagen);



router.post('',auth.isLogged, function (req, res) {


    async.waterfall([
        function(callback){
            try {
              var logo;
                if(req.body.pagina_nombre){

                    if (req.body.pagina_facebook_id) {
                        logo = "http://graph.facebook.com/"+sanitizer.sanitize(req.body.pagina_facebook);
                    }
                }

                var datos = {
                    pagina_nombre:      sanitizer.sanitize(req.body.pagina_nombre),
                    pagina_dominio:     sanitizer.sanitize(req.body.pagina_dominio),
                    pagina_logo:        logo,
                    pagina_portada:     sanitizer.sanitize(req.body.pagina_portada),
                    pagina_descripcion: sanitizer.sanitize(req.body.pagina_descripcion),
                    pagina_color:       sanitizer.sanitize(req.body.pagina_color),
                    pagina_tipo_id:     sanitizer.sanitize(req.body.pagina_tipo_id),
                    pagina_email:       sanitizer.sanitize(req.body.pagina_email),
                    pagina_direccion:   sanitizer.sanitize(req.body.pagina_direccion),
                    pagina_telefono:    sanitizer.sanitize(req.body.pagina_telefono),
                    pagina_facebook:    sanitizer.sanitize(req.body.pagina_facebook),
                    pagina_vencimiento: moment().format()
                };

                    callback(null,datos);
            } catch (e) {
                callback(e,null);
            }
        },
        function(datos, callback){
            //  Procedemos a agregar la página a la BD
            Pagina.addPagina(datos,function (err, result_pid) {
                if (err) {
                    callback(err,null);
                } else{
                    console.log('Página agregada: '+result_pid);
                    callback(null,result_pid);
                }
            });

        },
        function(result_pid, callback){
            Pagina.addUsuario(req.user.usuario_id,result_pid,function (err, result) {
                    if (err)
                        callback(err,null);
                    else{
                        console.log("Usuario agregado");
                        callback(null,result_pid);
                    }
                });
        },
        function (result_pid,callback) {
            Pagina.subdominio(req.body.pagina_subdominio,result_pid, function (err, data) {
                if (err) {
                    callback(err, null);
                } else{
                    callback(null,result_pid,data);
                }
            });
        },
        function (result_pid,subdominio_final,callback) {
            //  Api de webfaction para crear aplicación

                //  Código para crear subdominios :)
                console.log("ID de la página creada es : "+result_pid);
                //  Reducir a 1/10 la posibilidad de que se repita un subdominio
                var pagina_subdominio = subdominio_final;
                if (config.production) {
                    webfaction.login(function(result) {
                        var WEB_NAME = req.body.pagina_nombre;
                        WEB_NAME = WEB_NAME.replace(/\W/g, '');
                        WEB_NAME = WEB_NAME.toLowerCase();
                        console.log(pagina_subdominio);
                        webfaction.createDomain('nodex.mx',WEB_NAME, function(result) {
                            if (result) {

                                console.log("Subdominio creado");
                                console.log(result);

                                //  Creamos una aplicación -_-
                                var home_link = '/home/intrabits/webapps/intrabits/public/websites/paginas/'+result_pid;
                                webfaction.createApp({
                                    name: WEB_NAME,
                                    type: 'symlink54',
                                    extra_info: home_link
                                },function (result) {
                                    //  Listo, ahora creamos un website :)

                                    if (result) {
                                        console.log(result);
                                        console.log("WebFaction app creada");
                                         webfaction.createWebsite({
                                            website_name : WEB_NAME,
                                            ip: '75.126.173.142',
                                            https: false,
                                            subdomains: [pagina_subdominio],
                                            site_apps: [ [WEB_NAME,'/'] ]
                                          },
                                          function(result) {
                                            if (result) {
                                                console.log("WebFaction website creado");
                                                console.log(result);
                                                callback(null,result_pid);
                                            }else{
                                                callback("Error al crear el website",null);
                                            }
                                          });
                                    }else{
                                        callback("Error al crear el app",null);
                                    }

                                });


                            }else{
                                callback("no responde!",null);
                            }


                        });



                    });

                }else{
                    callback(null,result_pid);
                }

        }
    ], function (err, result) {
       if (err) {
        console.log(err);
        res.send(500);
       } else{
        console.log("Listo caleeeexto"+result);
        res.json(result);
       }
    });

});




module.exports = router;
