'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   return queryInterface.createTable('enderecos', { 
     id_endereco:{ 
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    cep:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    logradouro:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    bairro:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    cidade:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    uf:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    numero:{
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    complemento:{
      type: Sequelize.STRING,
    },
    id_usuario:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,     
    });

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('enderecos');

  }
};
