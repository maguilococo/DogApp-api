const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // Defining model
  sequelize.define('dog', {
    // This type of id, guarantees no repetition with api's ids
    id: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight_show: {
      type: DataTypes.STRING,
      allowNull: false
    },
    years: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true
    }
  }, {timestamps: false});
};
