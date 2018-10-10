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
    ethnicgroup: {
      allowNull: false,
      type: DataTypes.TEXT
    },    
    educationlevel: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});

  Participant.associate = function (models) {
    Participant.belongsTo(models.Experiment, {
      foreignKey: 'experiment_id',
      as: 'participant',
      onDelete: 'CASCADE',
    });
  }
  return Participant;
};
