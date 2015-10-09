var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Mensaje = sequelize.define('pagina_mensaje', {
  id:{
    type:Sequelize.INTEGER,
    field:'mensaje_id',
    primaryKey: true,
    autoIncrement: true
  },
  paginaId: {
    type:Sequelize.INTEGER,
    field:'mensaje_pagina_id'
  },
  leido: {
    type: Sequelize.STRING(15),
    field:'mensaje_leido'
  },
  status: {
    type: Sequelize.BOOLEAN,
    field:'mensaje_status'
  },
  email:{
    type: Sequelize.STRING(60),
    field:'usuario_email'
  },
  password: {
    type: Sequelize.STRING,
    field:'usuario_password'
  },
  raw: {
    type: Sequelize.STRING,
    field:'usuario_facebook_all'
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps:false
});

Mensaje.sync().done(function (data) {

});

module.exports = Mensaje;
