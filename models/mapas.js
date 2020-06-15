module.exports = (sequelize, Datatypes) => {
    const mapas = sequelize.define('mapas', {
        id_Mapa: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: Datatypes.FLOAT(10, 6),
            allowNull: false,
        },
        longitude: {
            type: Datatypes.FLOAT(10, 6),
            allowNull: false,
        },
        tipo: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        wifi:{
            type: Datatypes.INTEGER,
          },
          livro:{
            type: Datatypes.INTEGER,
          },
          cafeteria:{
            type: Datatypes.INTEGER,
          },
          mesas:{
            type: Datatypes.INTEGER,
          },
          computadores:{
            type: Datatypes.INTEGER,
          },
          tomadas:{
            type: Datatypes.INTEGER,
          },
        // ceatedAt: Datatypes.DATE,
        // updatedAt: Datatypes.DATE,
    })
    return mapas
}