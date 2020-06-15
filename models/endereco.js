'use strict';

module.exports = (sequelize, DataTypes) =>{
  
    const enderecos = sequelize.define(
        "enderecos",{
          id_endereco:{ 
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
          },
          cep:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          logradouro:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          bairro:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          cidade:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          uf:{
            type: DataTypes.STRING,
            allowNull: false,
          },
          numero:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          complemento:{
            type: DataTypes.STRING,
          },
          id_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "usuarios",
              key: "id_usuario",
              }
          },
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE,     
          });

  enderecos.associate = (models) => {
    enderecos.belongsTo(models.usuarios, {foreignKey:"id_usuario", as: 'usuarios'});
  };
 
  
  return enderecos;

}


