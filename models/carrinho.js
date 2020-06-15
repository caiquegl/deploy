module.exports = (sequelize, DataTypes) => {
    const carrinhos = sequelize.define(
        "carrinhos", 
        {
            id_carrinho:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                },
                foto_produto:{
                  type: DataTypes.STRING,
                },
              nome_produto:{
                type: DataTypes.STRING,
                allowNull: false,
              },
              quantidade_produto:{
                type: DataTypes.FLOAT,
                allowNull: false,
              },
              valor_produto:{
                type: DataTypes.DECIMAL,
                allowNull: false,
              },
              valor_total_produto:{
                type: DataTypes.DECIMAL,
                allowNull: false,
              },
              id_usuario:{
                type: DataTypes.INTEGER,
                allowNull: false,
              },
              id_produto:{
                type: DataTypes.INTEGER,
                allowNull: false,
              },
              createdAt: DataTypes.DATE,
              updatedAt: DataTypes.DATE,
        });
        carrinhos.associate = (models) => {
        carrinhos.belongsTo(models.usuarios, {foreignKey:"id_usuario", as: 'usuarios'});
        };
        carrinhos.associate = (models) => {
          carrinhos.belongsTo(models.produtos, {foreignKey:"id_produto", as: 'produtos'});
        };

    return carrinhos;
  
    };
