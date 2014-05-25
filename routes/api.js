var express = require('express');
var router  = express.Router();
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');
var Usuario = require('./../models/usuario.js');
var Pagina  = require('./../models/pagina.js');
var Soporte  = require('./../models/soporte.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
connection          = config.connection;


var condicion = {'seccion_pagina_id':1};

    var campos = Pagina.getSecciones(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            //console.log(data);
        } 
    });



/*===============================================   Usuario  ==================================================*/
router.get('/cuenta', ensureAuthenticated, function(req, res){res.json(req.user);  });


router.get('/usuario/:id',ensureAuthenticated, function (req, res) {
    
    var id = req.params.id;
    var campos = Usuario.getUsuario(id, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/misPaginas',ensureAuthenticated, function (req, res) {
    
    var condicion = {'usuario_id':req.user[0].usuario_id};    
    var campos = Usuario.getPaginas(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/usuario/:id/paginas',ensureAuthenticated, function (req, res) {
    var condicion = {'usuario_id':req.params.id};

    var campos = Usuario.getPaginas(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/pagos',ensureAuthenticated, function (req, res) {    
    var usuario_id = req.user[0].usuario_id;
    var condicion = {'pago_usuario_id':usuario_id};    

    var campos = Usuario.getPagos(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/pagos/pendientes',ensureAuthenticated, function (req, res) {    
    var usuario_id = req.user[0].usuario_id;
    var condicion = {'pago_usuario_id':usuario_id};    
    var campos = Usuario.getPagosPendientes(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/pagos/facturas',ensureAuthenticated, function (req, res) {    
    var usuario_id = req.user[0].usuario_id;
    var condicion = {'pago_usuario_id':usuario_id};
    

    var campos = Usuario.getFacturas(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});



// router.get('/usuarios/add', function (req, res) {
//     var datos={
//         'name':'Gatrolcino'
//     };    
//     usuario.addUsuario(datos,function(err,data){
//             if (err) {
//                 console.log("ERROR aqui : ",err);            
//             } else {            
//                 res.send("Agregado correctamente");
//             } 
//         });
// });



/*===============================================   Pagina  ================================================*/


router.get('/pagina/:id', function (req, res) {
    var condicion = {'pagina_id':req.params.id};

    var campos = Pagina.getPagina(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.put('/pagina/:id', function (req, res) {
    var datos = {
        pagina_nombre:      req.body.pagina_nombre,
        pagina_template_id: req.body.pagina_template_id,
        pagina_dominio:     req.body.pagina_dominio,
        pagina_descripcion: req.body.pagina_descripcion
    }

    var campos = Pagina.editPagina(req.params.id,datos, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            console.log('se editó');
            res.json(data);
        } 
    });
});


router.post('/pagina', function (req, res) {
    
    
    var datos = {
        pagina_nombre:      req.body.pagina_nombre,
        pagina_template_id: req.body.pagina_template_id,
        pagina_dominio:     req.body.pagina_dominio,
        pagina_descripcion: req.body.pagina_descripcion
    }
     var secciones = req.body.secciones;    


    var campos = Pagina.addPagina(datos, function( err, data){
        if (err) {            
            console.log("ERROR : ",err);     
            res.send('Error');       
        } else {                        
            var pagina_id = data;
            console.log(data);
            res.send(data);
            // Si la página se creó exitosamente, entonces vamos a crear sus secciones
        } 
    });
});

router.get('/pagina/:id/secciones', function (req, res) {
    var condicion = {'seccion_pagina_id':req.params.id};
    var seccion_id;
    var arreglo={};
    var campos = Pagina.getSecciones(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval            
                        
            res.json(data);
        } 
    });
});

router.get('/pagina/:id/:seccion', function (req, res) {
    var condicion = {'seccion_id':req.params.seccion};

    var campos = Pagina.getSeccion(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/seccion/:id', function (req, res) {
    var condicion = {'bloque_seccion_id':req.params.id};

    var campos = Pagina.getBloques(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});


/*===============================================   Soporte  ================================================*/


router.get('/faqs',function (req, res){
    var campos = Soporte.getFaqCategorias(function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/faqs/:id',function (req, res){
    var campos = Soporte.getFaqs(req.params.id,function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});

router.get('/faq/:id',function (req, res){
    var campos = Soporte.getFaq(req.params.id,function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});




router.put('/user/:id', function (req, res) {
    var ID = req.id;
    var nombre = req.name;       

    // connection.query("UPDATE users SET name = :name WHERE id= :id ", { name:nombre , id:ID });    
    res.send('eliminado'+nombre+ID);
});


module.exports = router;
