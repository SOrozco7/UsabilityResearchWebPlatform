
module.exports = (sequelize, DataTypes) => {
  const QuestionResponse = sequelize.define('QuestionResponse', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    videoId: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {});
  QuestionResponse.associate = (models) => {
    QuestionResponse.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question',
      onDelete: 'CASCADE',
    });
    QuestionResponse.belongsTo(models.Participant, {
      foreignKey: 'participant_id',
      as: 'participant',
      onDelete: 'CASCADE',
    });
  };

  return QuestionResponse;
};
