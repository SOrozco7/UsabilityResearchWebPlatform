module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Participants',
    [
      {
        experiment_id: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        experiment_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Participants',
    [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]),
};
