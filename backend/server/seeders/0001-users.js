module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        id: 'danperez@gmail.com',
        username: 'danperez@gmail.com',
        firstName: 'Dan',
        lastName: 'Perez',
        password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        // confirmed: true,
        // uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f0"
      },
      {
        id: 'jdoe@gmail.com',
        username: 'jdoe@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        // confirmed: true,
        // uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f1"
      },
      {
        id: 'bjoel@gmail.com',
        username: 'bjoel@gmail.com',
        firstName: 'Billy',
        lastName: 'Joel',
        password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        // confirmed: true,
        // uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f2"
      },
      {
        id: 'jjoel@gmail.com',
        username: 'jjoel@gmail.com',
        firstName: 'Jimmy',
        lastName: 'Joel',
        password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        // confirmed: true,
        // uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f3"
      },
      {
        id: 'jbanana@gmail.com',
        username: 'jbanana@gmail.com',
        firstName: 'Juanito',
        lastName: 'Banana',
        password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        // confirmed: true,
        // uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f4"
      },
      {
        id: 'mvargas@gmail.com',
        username: 'mvargas@gmail.com',
        firstName: 'Mary',
        lastName: 'Vargas',
        password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        // confirmed: true,
        // uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f5"
      },
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users',
    [
      {
        id: 'danperez@gmail.com',
      },
      {
        id: 'jdoe@gmail.com',
      },
      {
        id: 'bjoel@gmail.com',
      },
      {
        id: 'jjoel@gmail.com',
      },
      {
        id: 'jbanana@gmail.com',
      },
      {
        id: 'mvargas@gmail.com',
      },
    ]),
};
