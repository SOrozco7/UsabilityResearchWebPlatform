'use strict';
module.exports = (sequelize, DataTypes) => {
  var Participant = sequelize.define('Participant', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // There will be further information here, but as for now this solely serves
    // the purpose of bridging a QuestionnaireResponse with an 
    // Experiment.
  }, {});

  Participant.associate = function (models) {
    Participant.belongsTo(models.Experiment, {
      foreignKey: 'experiment_id',
      as: 'experiment',
      onDelete: 'CASCADE',
    });
  }
  return Participant;
};
