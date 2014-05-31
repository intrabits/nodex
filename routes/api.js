var express = require('express');
var router  = express.Router();
var shortId = require('shortid');
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');

//  Modelos
var Usuario = require('./../models/usuario.js');
var Pagina  = require('./../models/pagina.js');
var Soporte  = require('./../models/soporte.js');


//  Controladores
var PaginaCtrl  = require('./../controllers/pagina.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;
connection          = config.connection;




/*===============================================   Usuario  ==================================================*/
router.get('/cuenta', ensureAuthenticated, function(req, res){res.json(req.user);  });


router.get('/usuario/:id',ensureAuthenticated, function (req, res) {
    
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

router.get('/misPaginas',ensureAuthenticated, function (req, res) {
    
    var condicion = {'usuario_id':req.user[0].usuario_id};    
    Pagina.getPaginas(condicion, function( err, data){
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

    Usuario.getPaginas(condicion, function( err, data){
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

    Usuario.getPagos(condicion, function( err, data){
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
    Usuario.getPagosPendientes(condicion, function( err, data){
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
    

    Usuario.getFacturas(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});


/*===============================================   Pagina  ================================================*/


router.get('/pagina/:id', function (req, res) {
    
    // var condicion = {'pagina_id':req.params.id};
    Pagina.getPagina(req.params.id, function( err, data){
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

    // var datos = {
    //     pagina_nombre:      req.body.pagina_nombre,
    //     pagina_template_id: req.body.pagina_template_id,
    //     pagina_dominio:     req.body.pagina_dominio,
    //     pagina_descripcion: req.body.pagina_descripcion        
    // }

    var datos = {
        pagina_nombre:      req.body.pagina_nombre,
        pagina_template_id: req.body.pagina_template_id,        
        pagina_fondo:       req.body.pagina_fondo,
        pagina_fondo_color: req.body.pagina_fondo_color,
        pagina_texto_color: req.body.pagina_texto_color,

    }

    Pagina.editPagina(req.params.id,datos, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval            
            res.json(data);
        } 
    });
});

router.put('/pagina/:id/redes', function (req, res) {

    var datos = {
        facebook:  req.body.facebook,
        twitter:   req.body.twitter,        
        google:    req.body.google,
        instagram: req.body.instagram,
        youtube:   req.body.youtube,

    }

    Pagina.editRedes(req.params.id,datos, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval            
            res.json(data);
        } 
    });
});

//  Agregar una nueva página

router.post('/pagina', function (req, res) {    

    //  Datos que se insertarán en MongoDB
    var datos = {
        pagina_id:          '',
        pagina_nombre:      req.body.pagina_nombre,        
        usuario_id:         req.user[0].usuario_id,
        pagina_fondo:       '',
        pagina_fondo_color: '',
        pagina_fondo_fuente:'',
        pagina_texto_color: '',
        contacto:           [],
        secciones:          [],
        pagina_styles:      ''        
    }
    var secciones = req.body.secciones;    


    Pagina.createPagina(datos, function( err, data){
        if (err) {            
            console.log("ERROR : ",err);     
            res.send('Error');       
        } else {                        
            var pagina_id = data;                        
            //  Estos datos se guardarán en MySQL ya que se pueden requerir en consultas complejas            
            var DatosPagina = {
                pagina_status:      0,
                pagina_nombre:      req.body.pagina_nombre,
                pagina_template_id: req.body.pagina_template_id,
                pagina_dominio:     req.body.pagina_dominio,
                mongo:              data
            }


            Pagina.addPagina(DatosPagina,function (err, data) {
                if (err) console.log(err);
                else console.log("Página agregada a MySQL con el ID: " + data);   


                //  Agregar pagina_id a MongoDB para facilitar algunas cosillas, y sobre todo para evitarnos poner el _id que se genera automáticamente, porque es muuuuy largo U.U
                Pagina.setPagina_id(pagina_id,data,function (err, data) {
                    if (err) {console.log(err);}
                    else{
                        console.log("Se insertó pagina_id en MongoDB");
                    };
                });

                //  Se agrega le asigna un usuario a esa página, será el dueño

                var propiedad = {
                    pagina_id:  data,                
                    usuario_id: req.user[0].usuario_id
                };  

                Pagina.addUsuario(propiedad,function (err, data) {
                    if (err) console.log(err);
                    else console.log("Nuevo dueño agregado: " + data);                
                })

            });

            

            res.send(data);
            // Si la página se creó exitosamente, entonces vamos a crear sus secciones
        } 
    });
});


router.delete('/pagina/:documento/seccion/:id',function (req, res) {
    id = req.params.id;
    documento = req.params.documento;
    Pagina.deleteSeccion(documento, id,function (err, data) {
        if (err) {
            console.log(err);
        } else{            
            res.send('Ok');
        };
    });
});


router.get('/pagina/:pagina_id/settings', function(req, res){
    Pagina.getPagina(req.params.pagina_id,function (err, data) {
        if (err) {console.log('Hubo un error al recuperar la información de la página');} 
        else{
            res.json(data);
        };
    })
});

router.get('/pagina/:id/secciones', function (req, res) {
    var condicion = {'seccion_pagina_id':req.params.id};
    var seccion_id;
    var arreglo={};
    Pagina.getSecciones(condicion, function( err, data){
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

    Pagina.getSeccion(condicion, function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});


//  Ruta para agregar secciones
router.post('/pagina/:id', function (req, res) {
    var mongo = req.params.id;

    var datos = {
        _id:            shortId.generate(),
        seccion_nombre: req.body.seccion_nombre,
        seccion_icono:  req.body.seccion_icono,
        seccion_orden:  req.body.seccion_orden
    }
    Pagina.addSeccion(mongo,datos,function (err, data) {
        if (err) {console.log(err);}
        else{
            res.json(data)
        };
    });
});

router.get('/seccion/:id', function (req, res) {
    var condicion = {'bloque_seccion_id':req.params.id};

    Pagina.getBloques(condicion, function( err, data){
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
    Soporte.getFaqCategorias(function( err, data){
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
    Soporte.getFaqs(req.params.id,function( err, data){
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
    Soporte.getFaq(req.params.id,function( err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            res.json(data);
        } 
    });
});





module.exports = router;
