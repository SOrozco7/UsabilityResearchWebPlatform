'use strict';
module.exports = (sequelize, DataTypes) => {
  const Experiment = sequelize.define('Experiment', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDateTime: DataTypes.DATE,
    endDateTime: DataTypes.DATE
  }, {});
  Experiment.associate = function(models) {
    Experiment.belongsTo(models.User, {
    	foreignKey: 'userId'
    });
  };
  return Experiment;
};