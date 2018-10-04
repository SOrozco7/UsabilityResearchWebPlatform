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
    startDate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    }
  }, {});

  Experiment.associate = function (models) {

    Experiment.belongsTo(models.User, {

        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      })
    Experiment.belongsToMany(models.Questionnaire, {through: 'ExperimentQuestionnaire'});
  }

  return Experiment;
};