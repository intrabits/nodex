var express = require('express');
var router  = express.Router();
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');

var Usuario     = require('./../models/usuario.js');




router.get('/perfil', auth.isLogged, function(req, res){
    Usuario.perfil(req.user.id,function (err, data) {
        if (err) {
          console.error(err);
          res.status(500).send('Error al cargar los datos de tu perfil');
        } else {
            res.json(data);
        }
    });
});


router.get('/:id',auth.isLogged, function (req, res) {

    var id = req.params.id;
    Usuario.getUsuario(id, function( err, data){
        if (err) {
            // error handling code goes here
            console.error(err);
            res.status(500).send('Error al cargar el usuario');
        } else {
            // code to execute on data retrieval
            res.json(data);
        }
    });
});

router.post('/edit',auth.isLogged,function (req, res) {
    //  Revisamos que haya información que agregar
    if (req.body.usuario_nombre && req.body.usuario_email) {
        data = {
            usuario_nombre:      req.body.usuario_nombre,
            usuario_apellido_paterno:   req.body.usuario_apellido_paterno,
            usuario_apellido_materno:   req.body.usuario_apellido_materno,
            usuario_telefono:     req.body.usuario_telefono,
            usuario_direccion_fiscal: req.body.usuario_direccion_fiscal,
            usuario_rfc:            req.body.usuario_rfc,
            usuario_razon_social:   req.body.usuario_razon_social
        };

        Usuario.update(data,req.user.id,function (err, data) {
            if (err) {
                res.status(500).send('Error al actualizar el perfil');
                console.error(err);
            } else {
                console.log(data);
                res.json('OK');
            }
        });
    }else{
        res.status(500).send('Error al actualizar');
    }

});

router.post('/add',function (req, res) {
    //  Revisamos que haya información que agregar

    if (req.body.usuario_nombre && req.body.usuario_email) {
        var password;
        Lib.cryptPassword(newP,function (err, hash) {
            if (err) {
                console.log(err);
                res.send(500);
            } else{
                password = hash;
                data = {
                    usuario_nombre:      req.body.usuario_nombre,
                    usuario_apellido_paterno:   req.body.usuario_apellido_paterno,
                    usuario_email:       req.body.usuario_email,
                    usuario_telefono:     req.body.usuario_telefono,
                    usuario_password:     password
                };
                console.log(data);

                Usuario.addUsuario(data,function (err, data) {
                    if (err) {
                        res.send(500);
                        console.log(err);}
                    else{
                        console.log(data);
                        res.json('OK');
                    }
                });
            }
        });

    }else{
        res.send(500);
    }

});


router.post('/password',auth.isLogged,function (req, res) {

    //  Revisamos que hayan enviado TODA la info necesaria
    console.log(req.body.new_password);
    if (req.body.old_password && req.body.new_password) {
        console.log("Información llegó");

        Usuario.updatePass(req.body.old_password,req.body.new_password,req.user.id,function (err, data) {
            if (err) {
                res.send(500);
                console.log(err);}
            else{
                console.log("En teoría ya están editadas"+data);
                res.send('Contraseña actualizada');
            }
        });
    }else{
        console.log("No esta toda la info");
        res.status(500).send('Error al actualizar la contraseña');
    }

});


module.exports = router;
