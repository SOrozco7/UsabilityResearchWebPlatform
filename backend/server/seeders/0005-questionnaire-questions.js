'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QuestionnaireQuestions',
      [
        {
          text: "Overall, I am satisfied with how easy it is to use this system.",
          scaleSize: 7,
          questionnaire_id: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          text: "It was simple to use this system.",
          scaleSize: 7,
          questionnaire_id: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          text: "I think that I would like to use this system frequently.",
          scaleSize: 7,
          questionnaire_id: 2,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('QuestionnaireQuestions',
      [
        {
          id: 1
        },
        {
          id: 2,
        },
        {
          id: 3,
        }
      ]);
    }
  };