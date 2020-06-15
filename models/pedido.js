module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define(
    "Pedido",
    {
      id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,

      },
      id_endereco: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_produto: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      nome_produto: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      quantidade_produto: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      valor_produto: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      valor_total_produto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor_total_pedido: {
        type: DataTypes.STRING,
      },
      forma_de_pagamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  Pedido.associate = (models) => {
    Pedido.belongsTo(models.usuarios, { foreignKey: "id_usuario", as: 'usuarios' });
  };
  Pedido.associate = (models) => {
    Pedido.belongsTo(models.usuarios, { foreignKey: "id_endereco", as: 'usuarios' });
  };


  return Pedido;

};
