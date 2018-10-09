'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('experimentsQuestionnaires',
      [
        {
          QuestionnaireId: 1,
          ExperimentId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          QuestionnaireId: 2,
          ExperimentId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          QuestionnaireId: 2,
          ExperimentId: 1,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('experimentsQuestionnaires',
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