module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('QuestionnaireQuestions',
    [
      {
        text: 'Overall, I am satisfied with how easy it is to use this system.',
        questionnaire_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'It was simple to use this system.',
        questionnaire_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'I think that I would like to use this system frequently.',
        questionnaire_id: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('QuestionnaireQuestions',
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
