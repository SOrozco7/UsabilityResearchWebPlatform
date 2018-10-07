//create body parts migrations
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BodyParts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BodyPart: {
        type: Sequelize.ENUM,
        values: ['Head','Neck','SpineShoulder','ShoulderLeft','ShoulderRight','ElbowLeft','ElbowRight',
	    'WristLeft','WristRight','ThumbLeft','ThumbRight','HandLeft','HandRight','HandTipLeft','HandTipRight',
	    'SpineMid','SpineBase','HipLeft','HipRight','KneeLeft','KneeRight','AnkleLeft','AnkleRight','FootLeft','FootRight']
	  },
      experiment_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Experiments',
            key: 'id',
            as: 'experiment_id'
          }
        },  
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BodyParts');
  }
};