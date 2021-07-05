const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // Defining model
  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {timestamps: false});
};
