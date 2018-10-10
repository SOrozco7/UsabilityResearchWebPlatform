'use strict';
module.exports = (sequelize, DataTypes) => {
  var Questionnaire = sequelize.define('Questionnaire', {
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
  }, {});

  Questionnaire.associate = function (models) {
    Questionnaire.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
    });
    Questionnaire.hasMany(models.QuestionnaireQuestion, {
      foreignKey: 'questionnaire_id',
      as: 'questionnaires',
    })
    Questionnaire.belongsToMany(models.Experiment, { as: 'theExperiments', through: 'experimentsQuestionnaires'});
  }
  return Questionnaire;
};
