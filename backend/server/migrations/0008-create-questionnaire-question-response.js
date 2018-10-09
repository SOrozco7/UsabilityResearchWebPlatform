'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionnaireQuestionResponses', {
      QuestionnaireResponseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionnaireResponses',
          key: 'id',
        },
      },
      QuestionnaireQuestionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestionnaireQuestions',
          key: 'id',
        },
      },
      responseValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QuestionnaireQuestionResponses');
  }
};