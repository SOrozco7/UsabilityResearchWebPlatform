'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questionnaires',
      [
        {
          name: "CSUQ",
          description: "The canonical Computer System Usability Questionnaire developed by IBM.",
          user_id: "danperez@gmail.com",
          isPublic: true,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          name: "SUS",
          description: "System Usability Scale - a questionnaire for measuring usability.",
          isPublic: true,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          name: "Personal usability questionnaire for the Cognitive Graph Engine",
          description: "This questionnaire has been adapted from the CSUSSUQ.",
          user_id: "danperez@gmail.com",
          isPublic: false,
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questionnaires',
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