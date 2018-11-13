module.exports = (sequelize, DataTypes) => {
  const QuestionnaireQuestionResponse = sequelize.define('QuestionnaireQuestionResponse', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    responseValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  QuestionnaireQuestionResponse.associate = (models) => {
    QuestionnaireQuestionResponse.belongsTo(models.QuestionnaireQuestion, {
      foreignKey: 'QuestionnaireQuestionId',
      as: 'questionnaireQuestion',
      onDelete: 'CASCADE',
    });
    QuestionnaireQuestionResponse.belongsTo(models.QuestionnaireResponse, {
      foreignKey: 'QuestionnaireResponseId',
      as: 'questionnaireResponse',
      onDelete: 'CASCADE',
    });
  };
  return QuestionnaireQuestionResponse;
};
