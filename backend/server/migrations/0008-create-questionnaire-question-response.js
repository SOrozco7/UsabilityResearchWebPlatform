module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('QuestionnaireQuestion_Response', {
    response_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'QuestionnaireResponses',
        key: 'id',
        as: 'response_id',
      },
    },
    question_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'QuestionnaireQuestions',
        key: 'id',
        as: 'question_id',
      },
    },
    answerValue: {
      type: Sequelize.INTEGER,
    },
  }),
  down: queryInterface => queryInterface.dropTable('QuestionnaireQuestion_Response'),
};
