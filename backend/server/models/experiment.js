'use strict';
module.exports = (sequelize, DataTypes) => {
  var Experiment = sequelize.define('Experiment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    startDateTime: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDateTime: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

  Experiment.associate = function (models) {

    Experiment.belongsTo(models.User, {

        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      })
  }

  return Experiment;
};