var express = require('express');
var router  = express.Router();
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');

var Usuario     = require('./../models/usuario.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;



router.get('/perfil', ensureAuthenticated, function(req, res){
    Usuario.perfil(req.user.usuario_id,function (err, data) {
        if (err) {console.log(err);}
        else{
            res.json(data);
        };
    })
});


router.get('/:id',ensureAuthenticated, function (req, res) {
    
    var id = req.params.id;
    Usuario.getUsuario(id, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.post('/edit',ensureAuthenticated,function (req, res) {
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
        }
        console.log(data);

        Usuario.update(data,req.user.usuario_id,function (err, data) {
            if (err) {
                res.send(500);
                console.log(err);}
            else{
                console.log(data);
                res.json('OK');                
            };
        });
    }else{ 
        res.send(500);
    }
    
});


router.post('/password',ensureAuthenticated,function (req, res) {
    
    //  Revisamos que hayan enviado TODA la info necesaria    
    console.log(req.body.new_password);
    if (req.body.old_password && req.body.new_password) {
        console.log("Información llegó");
                
        Usuario.updatePass(req.body.old_password,req.body.new_password,req.user[0].user_id,function (err, data) {
            if (err) {console.log(err);}
            else{
                console.log("En teoría ya están editadas"+data);                
                res.json('OK');                
            };
        });        
    }else{ 
        console.log("No esta toda la info");
        res.json('error');
    }
    
});


module.exports = router;
