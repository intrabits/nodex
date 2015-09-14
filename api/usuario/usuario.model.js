var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

// var async = require('async');

var Usuario = sequelize.define('usuario', {
  id:{
    type:Sequelize.INTEGER,
    field:'usuario_id',
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING(30),
    field:'usuario_nombre'
  },
  apellidoPaterno: {
    type: Sequelize.STRING,
    field:'usuario_apellido_paterno'
  },
  apellidoMaterno: {
    type: Sequelize.STRING,
    field:'usuario_apellido_materno'
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

Usuario.sync().done(function (data) {

});

module.exports = Usuario;
