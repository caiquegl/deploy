'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('pedidos', {
     id_pedido:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
     }, 
    id_usuario:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
        }
    },
    id_endereco:{
      type: Sequelize.INTEGER,
    },
    id_produto:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    nome_produto:{
      type: Sequelize.STRING,
    },
    quantidade_produto:{
      type: Sequelize.STRING,
    },
    valor_produto:{
      type: Sequelize.STRING,
    },
    valor_total_produto:{
      type: Sequelize.STRING,
    },
    valor_total_pedido:{
      type: Sequelize.STRING,
    },
    forma_de_pagamento:{
      type: Sequelize.STRING,
      allowNull: false,
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
   return queryInterface.dropTable('pedidos');

  }
};
