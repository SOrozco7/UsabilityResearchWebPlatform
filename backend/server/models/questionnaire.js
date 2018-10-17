module.exports = (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    scaleSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Questionnaire.associate = (models) => {
    Questionnaire.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
    });
    Questionnaire.hasMany(models.QuestionnaireQuestion, {
      foreignKey: 'questionnaire_id',
      as: 'questions',
    });
    Questionnaire.belongsToMany(models.Experiment, { as: 'theExperiments', through: 'experimentsQuestionnaires'});
  };
  return Questionnaire;
};
