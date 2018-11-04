module.exports = (sequelize, DataTypes) => {
  const QuestionnaireQuestion = sequelize.define('QuestionnaireQuestion', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});

  QuestionnaireQuestion.associate = (models) => {
    QuestionnaireQuestion.belongsTo(models.Questionnaire, {
      foreignKey: 'questionnaire_id',
      as: 'questionnaire',
      onDelete: 'CASCADE',
    });
    QuestionnaireQuestion.belongsToMany(models.QuestionnaireResponse, {
      as: 'responses',
      through: models.QuestionnaireQuestionResponse,
    });
  };

  return QuestionnaireQuestion;
};
