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
    initialimage: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    finalimage: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    initialsound: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    finalsound: {
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