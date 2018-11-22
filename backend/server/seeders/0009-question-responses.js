

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('QuestionResponses',
    [
      {
        videoId: 'kJQP7kiw5Fk',
        question_id: 1,
        participant_id: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        videoId: '9bZkp7q19f0',
        question_id: 2,
        participant_id: 2,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('QuestionResponses',
    [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]),
};
