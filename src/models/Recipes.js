const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      validate: {
        min: 0,
        max: 100
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.STRING,
      validate: {
        min: 0,
        max: 100,
      }
    },
    instruccions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    

  },
  {
    timestamps: false
  });
};

