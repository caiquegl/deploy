'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('carrinhos', { 
    id_carrinho:{
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       },
       foto_produto:{
        type: Sequelize.STRING,
      },
     nome_produto:{
       type: Sequelize.STRING,
     },
     quantidade_produto:{
       type: Sequelize.INTEGER,
     },
     valor_produto:{
       type: Sequelize.DECIMAL,
     },
     valor_total_produto:{
       type: Sequelize.DECIMAL,
     },
     createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    id_usuario:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
        }
    },
    id_produto:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "produtos",
        key: "id_produto",
        }
    }
     });

 },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');

    */
   return queryInterface.dropTable('carrinhos');

  }
};
