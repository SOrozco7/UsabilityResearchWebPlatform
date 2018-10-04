'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionnaireQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      scaleSize: {
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.TEXT,
      },
      questionnaire_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questionnaires',
          key: 'id',
          as: 'questionnaire_id'
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QuestionnaireQuestions');
  }
}