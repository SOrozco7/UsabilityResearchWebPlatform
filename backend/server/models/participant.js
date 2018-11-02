'use strict';
module.exports = (sequelize, DataTypes) => {
  var Participant = sequelize.define('Participant', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    age: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    gender: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    ethnicGroup: {
      allowNull: false,
      type: DataTypes.TEXT
    },    
    educationLevel: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});

  Participant.associate = function (models) {
    Participant.belongsTo(models.Experiment, {
      foreignKey: 'experiment_id',
      as: 'experiment',
      onDelete: 'CASCADE',
    });
  }
  return Participant;
};
