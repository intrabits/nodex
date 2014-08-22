var express = require('express');
var router  = express.Router();
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');

var Soporte = require('./../models/soporte.js');

var passport        = auth.passport;
ensureAuthenticated = auth.ensureAuthenticated;


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
