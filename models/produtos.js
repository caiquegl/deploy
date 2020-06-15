'use strict';

module.exports = (sequelize, DataTypes) =>{
  
    const produtos = sequelize.define(
        "produtos",{
   id_produto:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  nome_produto:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor:{
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  id_usuario:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vendidos:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  });

  produtos.associate = (models) => {
    produtos.belongsTo(models.usuarios, {foreignKey:"id_usuario", as: 'usuarios'});
  };
  produtos.associate = (models) => {
    produtos.hasMany(models.carrinhos, {foreignKey:"id_produto", as: "carrinho"})
  };
  return produtos;

}


