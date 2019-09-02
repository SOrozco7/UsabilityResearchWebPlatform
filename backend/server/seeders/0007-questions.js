

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Questions',
    [
      {
        text: 'Using the pillow, make a gesture to turn the lightbulb on',
        initialImage: 'https://storage.googleapis.com/andres-bucket/lightbulboff.png',
        finalImage: 'https://storage.googleapis.com/andres-bucket/lightbulbon.png',
        initialSound: 'sound1.mp3',
        finalSound: 'sound2.mp3',
        experiment_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Using the pillow, make a gesture to play the music',
        initialImage: 'https://storage.googleapis.com/andres-bucket/itunesplay.png',
        finalImage: 'https://storage.googleapis.com/andres-bucket/itunesstopped.png',
        initialSound: 'sound3.mp3',
        finalSound: 'sound4.mp3',
        experiment_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Using the pillow, make a gesture to close the garage door',
        initialImage: 'https://storage.googleapis.com/andres-bucket/garageopen.png',
        finalImage: 'https://storage.googleapis.com/andres-bucket/garageclosed.png',
        initialSound: 'sound5.mp3',
        finalSound: 'sound6.mp3',
        experiment_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Questions',
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
