var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Publicacion = sequelize.define('pagina_publicacion', {

  id:{
    type:Sequelize.INTEGER,
    field:'publicacion_id',
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: Sequelize.STRING,
    field:'publicacion_titulo'
  },
  fecha:{
    type: Sequelize.DATE,
    field:'publicacion_fecha'
  },
  paginaId:{
    type: Sequelize.INTEGER,
    field:'publicacion_pagina_id'
  },
  contenido:{
    type: Sequelize.STRING,
    field:'publicacion_contenido'
  },
  video:{
    type: Sequelize.STRING,
    field:'publicacion_video'
  },
  destacada:{
    type: Sequelize.BOOLEAN,
    field:'publicacion_destacada'
  },
  imagen:{
    type: Sequelize.STRING,
    field:'publicacion_imagen'
  },
  // la imagen vertical que aparece en la parte de arriba de la publicación
  banner:{
    type: Sequelize.STRING,
    field:'publicacion_banner'
  }
}, {
  timestamps: false,
  // paranoid: true,
  // undescored:true,
  freezeTableName: true
});

Publicacion.sync({
  // force:true
}).done(function (data) {
  // if (data) {console.log('Modelo Credito actualizado');}
});

module.exports = Publicacion;
