module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('experimentsQuestionnaires', {
    ExperimentId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Experiments',
        key: 'id',
      },
    },
    QuestionnaireId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questionnaires',
        key: 'id',
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
  down: queryInterface => queryInterface.dropTable('experimentsQuestionnaires'),
};
