

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Questions',
    [
      {
        text: 'Cognitive Graph Engine',
        initialImage: 'image1.jpg',
        finalImage: 'image2.jpg',
        initialSound: 'sound1.mp3',
        finalSound: 'sound2.mp3',
        user_id: 'danperez@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Freiewahlentscheidungbildungsexperimentforschung',
        initialImage: 'image3.jpg',
        finalImage: 'image4.jpg',
        initialSound: 'sound3.mp3',
        finalSound: 'sound4.mp3',
        user_id: 'danperez@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Creative decision making',
        initialImage: 'image5.jpg',
        finalImage: 'image6.jpg',
        initialSound: 'sound5.mp3',
        finalSound: 'sound6.mp3',
        user_id: 'danperez@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        text: 'Real estate landscape autoethnography',
        initialImage: 'image7.jpg',
        finalImage: 'image8.jpg',
        initialSound: 'sound7.mp3',
        finalSound: 'sound8.mp3',
        user_id: 'danperez@gmail.com',
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
