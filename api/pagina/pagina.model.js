/*
También  conocido como "Compañía aseguradora"
*/

var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Pagina = sequelize.define('pagina', {

  id:{
    type:Sequelize.INTEGER,
    field:'pagina_id',
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: Sequelize.INTEGER
  },
  observaciones:{
    type: Sequelize.TEXT
  },
  tipo:{
    type: Sequelize.STRING(2)
  }
}, {
  // timestamps: false,
  // paranoid: true,
  // undescored:true,
  freezeTableName: true
});

Pagina.sync({
  // force:true
}).done(function (data) {
  // if (data) {console.log('Modelo Credito actualizado');}
});

module.exports = Pagina;
