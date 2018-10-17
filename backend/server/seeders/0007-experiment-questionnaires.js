module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('experimentsQuestionnaires',
    [
      {
        QuestionnaireId: 1,
        ExperimentId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        QuestionnaireId: 2,
        ExperimentId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        QuestionnaireId: 2,
        ExperimentId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('experimentsQuestionnaires',
    [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ]),
};
