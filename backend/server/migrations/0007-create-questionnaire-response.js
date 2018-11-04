module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('QuestionnaireResponses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    questionnaire_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questionnaires',
        key: 'id',
        as: 'questionnaire_id',
      },
    },
    participant_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Participants',
        key: 'id',
        as: 'participant_id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('QuestionnaireResponses'),
};
