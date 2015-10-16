var Pagina = require('./pagina.queries');
var Lib     = require('./../../lib/index.js');
var sanitizer = require('sanitizer');
var Promise = require('bluebird');
var webfaction = require('./../../config').webfaction;
var colors = require('colors');
var moment = require('moment');
var fs = require('fs');
var _ = require('lodash');
var shortId = require('shortid');
var Imagen 	= require('./../../models/imagen.js');

// Agregar promesas
Promise.promisifyAll(webfaction);
Promise.promisifyAll(fs);

// jshint ignore:start
exports.create = async function (req,res) {
  console.log('===========>  Creando nueva página  <==========='.yellow);

  let logo,hoy = new Date();
  if (req.body.pagina_facebook_id) {
      logo = "http://graph.facebook.com/"+sanitizer.sanitize(req.body.pagina_facebook);
  }
  var datos = {
      pagina_nombre:      sanitizer.sanitize(req.body.pagina_nombre),
      pagina_dominio:     sanitizer.sanitize(req.body.pagina_dominio),
      pagina_logo:        logo,
      pagina_portada:     sanitizer.sanitize(req.body.pagina_portada),
      pagina_descripcion: sanitizer.sanitize(req.body.pagina_descripcion),
      // pagina_color:       sanitizer.sanitize(req.body.pagina_color),
      pagina_tipo_id:     sanitizer.sanitize(req.body.pagina_tipo_id),
      pagina_email:       sanitizer.sanitize(req.body.pagina_email),
      pagina_direccion:   sanitizer.sanitize(req.body.pagina_direccion),
      pagina_telefono:    sanitizer.sanitize(req.body.pagina_telefono),
      pagina_facebook:    sanitizer.sanitize(req.body.pagina_facebook),
      pagina_vencimiento: moment(hoy).format()
  };
  console.log(datos);
  try {
    // La función retorna el ID de la página creada
    // Asignamos la página creada al usuario actual
    let pagina_id = await Pagina.addPaginaAsync(datos);
    console.log('El ID de la página creada será: ',colors.green(pagina_id));
    let usarioPagina = await Pagina.addUsuarioAsync(req.user.id,pagina_id);


    // Iniciamos sesión en webfaction para usar su API para la creación de la página
    let algo = await webfaction.loginAsync();

    // preparamos el dominio que vamos a usar: remover símbolos raros y espacios
    let webName = _.snakeCase(_.deburr(req.body.pagina_nombre));

    // Evitar subdominios repetidos

    let subdominio,path;

    Pagina.subdominioAsync(webName,pagina_id)
      .then(function (sd) {
        subdominio = sd;
        console.log('Subdominio elegido ',colors.green(subdominio));
        path = 'public/websites/paginas/' + pagina_id;
        console.log('Creando directorio');
        return fs.mkdirAsync(path);
      })
      .then(function () {
        // Creamos carpeta de la aplicación
        console.log('Creando archivos de la página');
        return fs.writeFileAsync(path + "/index.php", "<?php $pagina_id = " + pagina_id + "; require '../nucleo.php';?>");
      })
      .then(function () {
        // Creamos carpeta de las imagenes
        console.log('Creando carpeta de imagenes');
        return fs.mkdirAsync(path+'/img/');
      })
      .then(function () {
        // Damos de alta el subdominio
        console.log('Creando subdominio');
        return webfaction.createDomainAsync('nodex.mx',subdominio);
      })
      .then(function () {
        // Crear aplicación :)
        console.log('Creando app de webfaction');
        let homeLink = '/home/intrabits/webapps/nodex/nodex/public/websites/paginas/' + pagina_id;
        return webfaction.createAppAsync({
            name: subdominio,
            type: 'symlink54',
            extra_info: homeLink
          });
      })
      .then(function () {
        // crear el website, en webfaction es el elemento que relaciona una aplicación con un dominio
        console.log('Creando website de webfaction');
        return webfaction.createWebsiteAsync({
             website_name : subdominio,
             ip: '75.126.173.142',
             https: false,
             subdomains: [subdominio + '.nodex.mx'],
             site_apps: [ [subdominio,'/'] ]
           });
      })
      .then(function (pid) {

        console.log('===========>    ¡Website creado!    <==========='.green);
        res.send(String(pagina_id));

      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error al crear la página');
      });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear la página');
  }

};

// jshint ignore:end

exports.upload = function (req,res) {

  var pagina_id = req.params.pagina_id;
  console.log(req.user.nombre, ': subiendo imagen');
  // Primero revisamos que sea el dueño de la página :)
  Pagina.ownerAsync(req.user.id,pagina_id)
    .then(function (data) {
      var fstream;
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
          console.log('mimetype: ',mimetype);
          var name = shortId.generate() + '_' + filename;
          if (mimetype=='image/png'||mimetype=='image/jpeg') {
              var ruta = 'public/websites/paginas/'+ pagina_id + '/img/' + name;
              var ruta_corta = pagina_id + '/img/' + name;
              var tipo = req.params.tipo;
              console.log('Tipo de imagen: ',tipo);
              fstream = fs.createWriteStream(ruta);
              file.pipe(fstream);
              fstream.on('close', function () {

                // arreglo con los datos para crear la imagen
                var imagenArr = {
                    imagen_titulo       :tipo,
                    imagen_usuario_id   :req.user.id,
                    imagen_pagina_id    :pagina_id,
                    imagen_ruta         :ruta_corta
                };

                Imagen.saveAsync(imagenArr)
                  .then(function () {
                    if (tipo === 'logo') {
                      return Imagen.logoAsync(ruta_corta,pagina_id);
                    }
                    if (tipo === 'portada') {
                      return Imagen.portadaAsync(ruta_corta,pagina_id);
                    }
                    if (tipo === 'fondo') {
                      return Imagen.fondoAsync(ruta_corta,pagina_id);
                    }
                  })
                  .then(function (data) {
                    console.log(req.user.nombre,' subió una imagen correctamente'.green);
                    res.send('Archivo guardado correctamente');
                  })
                  .catch(function (err) {
                    console.trace(err);
                    throw err;
                  });

              });

              fstream.on('error', function(err) {
                console.trace(err);
                throw err;
              });
          }else{
              console.log("Alguien intentó subir un archivo inválido");
              res.status(500).send('Tipo de archivo no permitido');
          }

      });

    })
    .catch(function (err) {
      console.trace(err);
      res.status(500).send('Error al subir la imagen');
    });
};

exports.paquetes = function (req,res) {
  Pagina.getPaquetes(function( err, data){
      if (err) {
          // error handling code goes here
          console.error(err);
          res.status(500).send('Error al cargar los paquetes');
      } else {
          // code to execute on data retrieval
          res.json(data);
      }
  });
};

exports.misPaginas = function (req,res) {
  Pagina.getPaginas(req.user.id, function( err, data){
      if (err) {
          console.error(err);
          res.status(500).send('Error al cargar las páginas de tu cuenta');
      } else {
          res.json(data);
      }
  });
};

exports.vencidas = function (req, res){
    Pagina.getExpired(req.user.id, function( err, data){
        if (err) {
            // error handling code goes here
            console.error(err);
            res.status(500).send('Error al comprobar si hay páginas con renovación pendiente');
        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
};

exports.show = function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;
    Pagina.getPagina(pagina_id,usuario_id, function( err, data){
        if (err) {
            // error handling code goes here
            console.error(err);
            res.status(500).send('Error al cargar la página');
        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
};

exports.update = function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;
    var datos = {
        pagina_nombre: sanitizer.sanitize(req.body.pagina_nombre),
        pagina_dominio:sanitizer.sanitize(req.body.pagina_dominio),
        pagina_descripcion: sanitizer.sanitize(req.body.pagina_descripcion),
        pagina_telefono: sanitizer.sanitize(req.body.pagina_telefono),
        pagina_direccion:sanitizer.sanitize(req.body.pagina_direccion),
        pagina_email:    sanitizer.sanitize(req.body.pagina_email),
        pagina_descripcion_larga: req.body.pagina_descripcion_larga,
        pagina_nosotros: req.body.pagina_nosotros,
        pagina_facebook:    sanitizer.sanitize(req.body.pagina_facebook),
        pagina_twitter:     sanitizer.sanitize(req.body.pagina_twitter),
        pagina_youtube:     sanitizer.sanitize(req.body.pagina_youtube),
        pagina_google:      sanitizer.sanitize(req.body.pagina_google),
        pagina_instagram:   sanitizer.sanitize(req.body.pagina_instagram),
    };
    Pagina.update(pagina_id,usuario_id,datos, function( err, data){
        if (err) {
            res.status(500).send('Error al guardar la página');
            console.error(err);
        } else {
            res.json(data);
        }
    });
};

exports.cuentas = function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;
    Pagina.getCuentas(pagina_id, function( err, data){
        if (err) {
            // error handling code goes here
            console.error(err);
            res.status(500).send('Error al cargar las cuentas');
        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
};

exports.publicacion = function (req, res){
    var usuario_id = req.user.id;
    var publicacion_id  = req.params.publicacion_id;


    Pagina.getPublicacion(publicacion_id, function( err, data){
        if (err) {
            // error handling code goes here
            console.error(err);
            res.status(500).send('Error al cargar la publicación');
        } else {
            res.json(data);
        }
    });

};

exports.togglePublicacion = function (req, res){
    var usuario_id = req.user.id;
    var publicacion_id  = req.params.publicacion_id;


    Pagina.togglePublicacionDestacada(publicacion_id, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);
            res.send(400,"Error al actualizar la publicación");
        } else {
            res.json(data);
        }
    });

};

exports.addCuenta = function (req, res){
    var usuario_id = req.user.id;
    var pagina_id  = req.params.pagina_id;

    async.waterfall([
        function(callback){
            Pagina.addCuenta(req.body.cuenta_email,req.body.cuenta_password,pagina_id, function( err, data){
                if (err) {
                    // error handling code goes here
                    console.log("ERROR : ",err);
                    res.send(500);
                } else {

                }
            });
            callback(null,req.params.pagina_id);
        },
        function(pagina_id, callback){
            //  Revisamos que sea el dueño de la página
            Pagina.owner(req.user.id,req.params.pagina_id,function (err,data) {
                if(err)
                    callback(err,null);
                else
                    callback(null,pagina_id);
            });
        },
        function(pagina_id, callback){
            //ya creada la cuentaprocedemos a agregar el usuario
            if (req.body.cuenta_email && req.body.cuenta_password) {
                var password;
                Lib.cryptPassword(req.body.cuenta_password,function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.send(500);
                    } else{
                        password = hash;
                        data = {
                            usuario_email:       sanitizer.sanitize(req.body.cuenta_email),
                            usuario_password:     password
                        };

                        Usuario.addUsuario(data,function (err, new_usuario_id) {
                            if (err)
                                callback(err,null);
                            else{
                                console.log(new_usuario_id);
                                Pagina.addUsuario(new_usuario_id,req.params.pagina_id,function (err,data) {
                                    if (err) {
                                        callback(err,null);
                                    }
                                    else{
                                        callback(null, 'done');
                                    }
                                });
                            }
                        });
                    }
                });

            }
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
            res.send(500);
       } else{
            res.json('ok');
       }
    });


};
