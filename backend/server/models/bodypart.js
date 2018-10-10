//models experiment js
'use strict';
module.exports = (sequelize, DataTypes) => {
  var BodyParts = sequelize.define('BodyParts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    BodyPart: {
      type: DataTypes.ENUM,
      values: ['Head','Neck','SpineShoulder','ShoulderLeft','ShoulderRight','ElbowLeft','ElbowRight',
      'WristLeft','WristRight','ThumbLeft','ThumbRight','HandLeft','HandRight','HandTipLeft','HandTipRight',
      'SpineMid','SpineBase','HipLeft','HipRight','KneeLeft','KneeRight','AnkleLeft','AnkleRight','FootLeft','FootRight']
    },
  }, {});

  BodyParts.associate = function (models) {

    BodyParts.belongsTo(models.Experiment, {
      foreignKey: 'experiment_id',
      as: 'experiment',
      onDelete: 'CASCADE',
    });
  }

  return BodyParts;
};