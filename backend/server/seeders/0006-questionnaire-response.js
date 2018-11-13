module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('QuestionnaireResponses',
    [
      {
        questionnaire_id: 1,
        participant_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        questionnaire_id: 1,
        participant_id: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        questionnaire_id: 2,
        participant_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('QuestionnaireResponses',
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
