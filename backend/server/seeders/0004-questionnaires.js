module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Questionnaires',
    [
      {
        name: 'CSUQ',
        description: 'The canonical Computer System Usability Questionnaire developed by IBM.',
        user_id: 'danperez@gmail.com',
        isPublic: true,
        scaleSize: 7,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'SUS',
        description: 'System Usability Scale - a questionnaire for measuring usability.',
        isPublic: true,
        scaleSize: 5,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Personal usability questionnaire for the Cognitive Graph Engine',
        description: 'This questionnaire has been adapted from the CSUSSUQ.',
        user_id: 'danperez@gmail.com',
        isPublic: false,
        scaleSize: 6,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Questionnaires',
    [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ]),
};
