'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mapas', {
      id_Mapa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.FLOAT(10, 6),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.FLOAT(10, 6),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wifi:{
        type: Sequelize.INTEGER,
      },
      livro:{
        type: Sequelize.INTEGER,
      },
      cafeteria:{
        type: Sequelize.INTEGER,
      },
      mesas:{
        type: Sequelize.INTEGER,
      },
      computadores:{
        type: Sequelize.INTEGER,
      },
      tomadas:{
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('mapas');
  }
};
