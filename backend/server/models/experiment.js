module.exports = (sequelize, DataTypes) => {
  const Experiment = sequelize.define('Experiment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  }, {});

  Experiment.associate = (models) => {
    Experiment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
    });
    Experiment.belongsToMany(models.Questionnaire, { as: 'questionnaires', through: 'experimentsQuestionnaires' });
    Experiment.hasMany(models.BodyParts, {
      foreignKey: 'experiment_id',
      as: 'bodyparts',
    });
    Experiment.hasMany(models.Question, {
      foreignKey: 'experiment_id',
      as: 'questions',
    });
  };

  return Experiment;
};
