'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionnaireResponses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('QuestionnaireResponses');
  }
}