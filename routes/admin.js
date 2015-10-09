var express = require('express');
var router  = express.Router();
var config  = require('./../config/config.js');
var auth    = require('./../config/auth.js');

var webfaction = config.webfaction;

var passport        = auth.passport;
var ensureAuthenticated = auth.ensureAuthenticated;
var ensureAdmin         = auth.ensureAdmin;



router.get('/dominios', ensureAdmin, function(req, res){

    webfaction.login(function (result) {
        webfaction.listDomains(function(result) {
            res.json(result);
        });
    });

});


router.get('/apps', ensureAdmin, function(req, res){

    webfaction.login(function (result) {
        webfaction.listApps(function(result) {
            res.json(result);
          });
    });

});

router.get('/websites', ensureAdmin, function(req, res){

    webfaction.login(function (result) {
        webfaction.listWebsites(function(result) {
            res.json(result);
          });
    });

});

router.get('/bandwidth', ensureAdmin, function(req, res){

    webfaction.login(function (result) {
        webfaction.listBandwidth(function(result) {
            res.json(result);
          });
    });

});

router.delete('/app/:name',function (req, res) {
    var name = req.params.name;
    webfaction.login(function (result) {
        if (result) {
            try {
                webfaction.deleteApp(name,function(result) {
                    res.json(result);
                  });
            } catch (e) {
                res.send(500);
             }

        }else{
            res.send(500);
        }
    });
});

router.delete('/website/:name',function (req, res) {
    var name = req.params.name;
    webfaction.login(function (result) {
        if (result) {
            var ops = {
                website_name: req.params.name,
                ip: config.wf_ip
            };
            try {
                console.log(ops);
                webfaction.deleteWebsite(ops,function(result) {
                    res.json('Website eliminado');

                  });
            } catch (e) {
                console.log(err);
                res.send(500);
             }

        }else{

        }
    });
});



router.delete('/domain/:name',function (req, res) {
    var name = req.params.name;
    webfaction.login(function (result) {
        if (result) {
            webfaction.deleteDomain(function(result) {
                res.json(result);
              });
        }else{
            res.send(500);
        }
    });
});



module.exports = router;
