module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('QuestionResponses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    videoId: {
      type: Sequelize.STRING,
    },
    question_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Questions',
        key: 'id',
        as: 'question_id',
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
  down: queryInterface => queryInterface.dropTable('QuestionResponses'),
};
