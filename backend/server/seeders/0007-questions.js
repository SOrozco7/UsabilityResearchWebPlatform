

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Questions',
    [
      {
        text: 'Using the pillow, make a gesture to turn the tv on',
        initialImage: 'image1.jpg',
        finalImage: 'image2.jpg',
        initialSound: 'sound1.mp3',
        finalSound: 'sound2.mp3',
        experiment_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Using the pillow, make a gesture to turn the tv off',
        initialImage: 'image3.jpg',
        finalImage: 'image4.jpg',
        initialSound: 'sound3.mp3',
        finalSound: 'sound4.mp3',
        experiment_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Using the pillow, make a gesture to increase the volume',
        initialImage: 'image5.jpg',
        finalImage: 'image6.jpg',
        initialSound: 'sound5.mp3',
        finalSound: 'sound6.mp3',
        experiment_id: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Using the pillow, make a gesture to play a song',
        initialImage: 'image7.jpg',
        finalImage: 'image8.jpg',
        initialSound: 'sound7.mp3',
        finalSound: 'sound8.mp3',
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
      {
        id: 4,
      },
    ]),
};
