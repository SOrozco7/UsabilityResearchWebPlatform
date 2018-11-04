
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.STRING,
    },
    initialImage: {
      type: Sequelize.STRING,
    },
    finalImage: {
      type: Sequelize.STRING,
    },
    initialSound: {
      type: Sequelize.STRING,
    },
    finalSound: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    user_id: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'id',
        as: 'user_id',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Questions'),
};
