module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('QuestionnaireQuestions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    questionnaire_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questionnaires',
        key: 'id',
        as: 'questionnaire_id',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('QuestionnaireQuestions'),
};
