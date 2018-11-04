module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Participants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    experiment_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Experiments',
        key: 'id',
        as: 'experiment_id',
      },
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      ethnicGroup: {
        type: Sequelize.STRING
      },
      educationLevel: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      experiment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Experiments',
          key: 'id',
          as: 'experiment_id'
        }
      },
  
  
    }
  }),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Participants');
  }
};
