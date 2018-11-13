module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Experiments',
    [
      {
        name: 'Cognitive Graph Engine',
        description: 'This project can store information relevant to graphs',
        startDate: new Date(Date.UTC(2016, 0, 1)),
        endDate: new Date(Date.UTC(2016, 4, 1)),
        user_id: 'danperez@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Freiewahlentscheidungbildungsexperimentforschung',
        description: 'Dieser Text ist ein Beispiel.',
        startDate: new Date(Date.UTC(2018, 0, 1)),
        endDate: new Date(Date.UTC(2018, 4, 1)),
        user_id: 'danperez@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Creative decision making',
        description: 'Under development.',
        startDate: new Date(Date.UTC(2019, 0, 11)),
        endDate: new Date(Date.UTC(2019, 4, 11)),
        user_id: 'danperez@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        name: 'Real estate landscape autoethnography',
        description: 'Experiment focuses on the visualization of new geographies and their interpretation.',
        startDate: new Date(Date.UTC(2017, 0, 11)),
        endDate: new Date(Date.UTC(2017, 4, 11)),
        user_id: 'danperez@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Experiments',
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
      {
        id: 4,
      },
    ]),
};
