
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    initialImage: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    finalImage: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    initialSound: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    finalSound: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
  }, {});

  Question.associate = (models) => {
    Question.belongsTo(models.Experiment, {

      foreignKey: 'experiment_id',
      as: 'experiments',
      onDelete: 'CASCADE',
    });
    Question.belongsToMany(models.Questionnaire, { through: 'QuestionQuestionnaire' });
  };
  return Question;
};
