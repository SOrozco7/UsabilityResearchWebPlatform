module.exports = (sequelize, DataTypes) => {
  const QuestionnaireResponse = sequelize.define('QuestionnaireResponse', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // In future, when Participant model is created, there will be a foreign key to it.
  }, {});

  QuestionnaireResponse.associate = (models) => {
    QuestionnaireResponse.belongsTo(models.Questionnaire, {
      foreignKey: 'questionnaire_id',
      as: 'questionnaire',
      onDelete: 'CASCADE',
    });
    QuestionnaireResponse.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
      as: 'participant',
      onDelete: 'CASCADE',
    });
    QuestionnaireResponse.belongsToMany(models.QuestionnaireQuestion, {
      as: 'questions',
      through: models.QuestionnaireQuestionResponse,
    });
  };
  return QuestionnaireResponse;
};
