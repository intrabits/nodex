var PublicacionCtrl = require('./publicacion.controller');
var express = require('express');
var router  = express.Router();

router.get('/',PublicacionCtrl.index);
router.delete('/:id',PublicacionCtrl.delete);

module.exports = router;
