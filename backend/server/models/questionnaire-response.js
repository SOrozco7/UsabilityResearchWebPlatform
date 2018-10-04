'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuestionnaireResponse = sequelize.define('QuestionnaireResponse', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // In future, when Participant model is created, there will be a foreign key to it.
  }, {});

  QuestionnaireResponse.associate = function (models) {
    QuestionnaireResponse.belongsTo(models.Questionnaire, {
      foreignKey: 'questionnaire_id',
      as: 'questionnaire',
      onDelete: 'CASCADE',
    });
  }
  return QuestionnaireResponse;
};
