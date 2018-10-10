'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions',
      [
        {
          text: "Cognitive Graph Engine",
          initialimage: "image1.jpg",
          finalimage: "image2.jpg",
          initialsound: "sound1.mp3",
          finalsound: "sound2.mp3",
          user_id: "danperez@gmail.com",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          text: "Freiewahlentscheidungbildungsexperimentforschung",
          initialimage: "image3.jpg",
          finalimage: "image4.jpg",
          initialsound: "sound3.mp3",
          finalsound: "sound4.mp3",
          user_id: "danperez@gmail.com",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          text: "Creative decision making",
          initialimage: "image5.jpg",
          finalimage: "image6.jpg",
          initialsound: "sound5.mp3",
          finalsound: "sound6.mp3",
          user_id: "danperez@gmail.com",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
        {
          text: "Real estate landscape autoethnography",
          initialimage: "image7.jpg",
          finalimage: "image8.jpg",
          initialsound: "sound7.mp3",
          finalsound: "sound8.mp3",
          user_id: "danperez@gmail.com",
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW')
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions',
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