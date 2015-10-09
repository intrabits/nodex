var PublicacionCtrl = require('./publicacion.controller');
var express = require('express');
var router  = express.Router();

router.get('/',PublicacionCtrl.index);
router.delete('/:id',PublicacionCtrl.delete);
router.post('/:id/upload',PublicacionCtrl.imagen);
router.post('/:id/banner',PublicacionCtrl.banner);
router.put('/:id',PublicacionCtrl.update);

module.exports = router;
