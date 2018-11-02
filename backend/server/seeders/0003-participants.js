'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participants',
      [
        {
          experiment_id: 1,
          name: "John Nash",
          age: 72,
          gender: "Male",
          ethnicGroup: "Aryan",
          educationLevel: "PhD",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          experiment_id: 2,
          name: "Isaac Newton",
          age: 32,
          gender: "Male",
          ethnicGroup: "Aryan",
          educationLevel: "PhD",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Participants',
      [
        {
          id: 1
        },
        {
          id: 2,
        },
      ]);
    }
  };