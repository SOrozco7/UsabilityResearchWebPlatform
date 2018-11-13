module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
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

  Participant.associate = (models) => {
    Participant.belongsTo(models.Experiment, {
      foreignKey: 'experiment_id',
      as: 'experiment',
      onDelete: 'CASCADE',
    });
  };
  return Participant;
};
