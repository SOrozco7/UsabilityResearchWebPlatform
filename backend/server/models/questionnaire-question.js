'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuestionnaireQuestion = sequelize.define('QuestionnaireQuestion', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});

  QuestionnaireQuestion.associate = function (models) {
    QuestionnaireQuestion.belongsTo(models.Questionnaire, {
      foreignKey: 'questionnaire_id',
      as: 'questionnaire',
      onDelete: 'CASCADE',
    });
  }

  return QuestionnaireQuestion;
};