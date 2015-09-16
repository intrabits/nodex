var Pagina = require('./pagina.queries');
var Lib     = require('./../../lib/index.js');
var sanitizer = require('sanitizer');

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
