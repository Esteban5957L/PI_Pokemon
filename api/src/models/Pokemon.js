const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      primaryKey:true,
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      //Te permito que este, (falso = no te permito que este vacio)
      //                     (true = te permito que este vacio)
      allowNull:false,
       
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }

  }, {timestamps: false});

};
