'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [
        {
          username: "Rick12",
          firstName: "Rick",
          lastName: "Gómez Velasco",
          email: "rickgv@example.com",
          password: "vGA1O9wmRjrwAVXD98HNOgsNpDczlqm3Jq7KnEd1rVAGv3Fykk1ar",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          username: "jsimpson",
          firstName: "Jason",
          lastName: "Simpson",
          email: "jason.simpson43@example.com",
          password: "QjSH496pcT5CEbzjD/vtVeH03tfHKFy36d4J0Ltp3lRtee9HDxY3K",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          username: "rroberts",
          firstName: "Richard",
          lastName: "Roberts",
          email: "rroberts@example.com",
          password: "q5MkhSBtlsJcNEVsYh64a.aCluzHnGog7TQAKVmQwO9C8xb.t89F.",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          username: "jmyg",
          firstName: "Joachim Migüas",
          lastName: "Ysidoro-Groß",
          email: "joachimyg@example.com",
          password: "YzJBSzV4TUhkMzc3d3laeg$zqU/1IN0/AogfP4cmSJI1vc8lpXRW9",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        }
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users',
      [
        {
          id: 1
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        }
      ]);
  }
};