1. To change the environment to the test environment. This is recommended because this way you can have a development database and a test database. Make sure that the test DB has already been created, migrated and seeded.

    export NODE_ENV=test

2. To start the server in test mode:

    npm run start:test

3. To run all tests:

    npm test

4. To run a single test:

    jest <TEST_FILE_NAME>

