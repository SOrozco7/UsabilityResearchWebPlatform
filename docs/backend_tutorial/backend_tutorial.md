#
TUTORIAL FOR BACKEND CRUD

##
In this tutorial we will focus on creating a method for the backend of an application.
This method wil be named 'create-question'.

1. Creating your main folder

   First, create a folder, named backend.
   Then, enter to your folder /backend, and create the 'server' folder, and enter to that folder.


2. Creating sub-folders

   Once in the server/ folder create the following folders:
     * config
     * controllers
     * migrations
     * models
     * routes
     * seeders
     * services

3. Folder server/models/

   Now that you have those folders created, we need to write files and add them to each one of those folders.
   We can start by entering to the server/models/ folder and creating a file named 'question.js'.

4. The file 'question.js'

    On the file 'question.js' we add the following code:

    ```javascript
    module.exports = (sequelize, DataTypes) => {
        const Question = sequelize.define('Question', {
            id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            },
            text: {
            allowNull: false,
            type: DataTypes.TEXT,
            },
            initialImage: {
            allowNull: false,
            type: DataTypes.TEXT,
            },
            finalImage: {
            allowNull: false,
            type: DataTypes.TEXT,
            },
            initialSound: {
            allowNull: false,
            type: DataTypes.TEXT,
            },
            finalSound: {
            allowNull: false,
            type: DataTypes.TEXT,
            },
        }, {});
        Question.associate = (models) => {
            Question.belongsToMany(models.Questionnaire, { through: 'QuestionQuestionnaire' });
        };

        return Question;
        };
    ```


5. The folder server/controllers/

   Now we go to our server/controllers/ folder and add the following information:

     1. We create an 'index.js' file and add the following code:
        ```javascript
        const questions = require('./questions');

        module.exports = {
        questions
        };
        ```
     2. Then we create a file named 'questions.js' that will look like:
        ```javascript
        const { Question } = require('../models');

        module.exports = {
        create(req, res) {
            // check that params are not null, undefined or empty string
            if (!req.body.text) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "text" of an instance of "Question" cannot be empty.',
            });
            }
            if (!req.body.initialImage) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "initialImage" of an instance of "Question" cannot be empty.',
            });
            }
            if (!req.body.finalImage) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "finalImage" of an instance of "Question" cannot be empty.',
            });
            }
            if (!req.body.initialSound) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "inititalSound" of an instance of "Question" cannot be empty.',
            });
            }
            if (!req.body.finalSound) {
            return res.status(400).send({
                status: 400,
                message: 'The attribute "finalSound" of an instance of "Question" cannot be empty.',
            });
            }

            return Question
            .create({
                text: req.body.text,
                initialImage: req.body.initialImage,
                finalImage: req.body.finalImage,
                initialSound: req.body.initialSound,
                finalSound: req.body.finalSound,
                experiment_id: req.body.experiment_id,
            })
            .then(question => res.status(201).send(question))
            .catch(error => res.status(400).send(error));
        },

        list(req, res) {
            return Question
            .findAll({
            })
            .then(questions => res.status(200).send(questions))
            .catch(error => res.status(400).send(error));
        },

        retrieve(req, res) {
            // check that question id is not null, undefined. Check that the id is not zero.
            if (!req.body.id && req.body.id === parseInt(req.body.id, 10)) {
            return res.status(400).send({
                message: 'The question ID must be an integer bigger than 0',
            });
            }

            return Question
            .findById(req.params.id, {
                attributes: ['id', 'text', 'initialImage', 'finalImage', 'initialSound', 'finalSound', 'createdAt', 'updatedAt', 'experiment_id'],
            })
            .then((question) => {
                if (!question) {
                return res.status(400).send({
                    status: 400,
                    message: 'No question with that ID was found.',
                });
                }
                return res.status(200).send(question);
            })
            .catch(error => res.status(400).send(error));
        },
        ```

6. Defining the routes

   Now, we are ready to define the routes in which our server will find the information.
   For that, we go the the folder server/routes/ and add the following information to the 'index.js' file:

    ```javascript
    const usersController = require('../controllers').users;
    const questionsController = require('../controllers').questions;

    module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the GestureWeb Project API!',
    }));

    // Authentication routes

    // Routes for the QUESTIONS table
    app.post('/api/questions', questionsController.create);
    app.get('/api/questions', questionsController.list);
    app.get('/api/questions/:id', questionsController.retrieve);
    app.put('/api/questions/:id', questionsController.update);
    app.delete('/api/questions/:id', questionsController.destroy);

    };
    ```

7. Sequelize

   Now we can go to the following folder: server/migrations/... Here we will be able to create a file defining all the attributes that our database entity will have, in our case, the 'question' entity.
   Now, we create a file named 'create-question.js', and add the following code:

    ```javascript
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
        experiment_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Experiments',
            key: 'id',
            as: 'experiment_id',
        },
        },
    }),
    down: queryInterface => queryInterface.dropTable('Questions'),
    };
    ``` 

8. The file 'config.json'

   Now, we go to the following file path:
    backend/server/config/config.json
   In this file, we add the following code:

    ```json
    {
    "development": {
        "username": "your_username",
        "password": "your_password",
        "database": "database_development",
        "host": "127.0.0.1",
        "port": "5432",
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "a_username",
        "password": "a_password",
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
    }

    ``` 

9. Seeding information

   Finally, we need to add some default information to fill de database with information. To do this, we go to server/seeders/ and create a file named 'questions.js', and add the following code:

    ```javascript
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
        }
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
        }
        ]),
    };
    ```
