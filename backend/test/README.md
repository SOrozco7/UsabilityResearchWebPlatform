To setup your testing environment, do the following:

1. Change the environment to the test environment. This is recommended because this way you can have a development database and a test database. Make sure that the test DB has already been created, migrated and seeded.

    export NODE_ENV=test

2. Start the server:

    npm run start

To run tests, you can either run the full test suite or run a specific subset of tests.

- To run all tests:

    npm test

- To run a subset of tests whose file names match a specific substring. E.g. specifying "Retrieve" would run both 'RetrieveExistingExperiment.test' and 'RetrieveNonExistentExperiment.test':

    jest <TEST_FILE_NAME_SUBSTRING>

