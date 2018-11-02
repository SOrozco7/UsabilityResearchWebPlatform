'use strict';
module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define('Question', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    initialImage: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    finalImage: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    initialSound: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    finalSound: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});

  Question.associate = function (models) {

    Question.belongsTo(models.User, {

        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
      })
    Question.belongsToMany(models.Questionnaire, {through: 'QuestionQuestionnaire'});
  }

  return Question;
};