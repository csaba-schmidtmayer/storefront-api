# Storefront API

This is the project code of Storefront API for the *Creating an API with PostgreSQL and Express* course in the Udacity Full Stack JavaScript Developer Nanodegree Program.

## Setting up the project

**Prerequisites:**
Node.js, npm, and PostgreSQL is installed on your machine.

db-migrate is installed globally.

1. Clone the repository to your local computer.
2. `cd` into the project folder.
3. Install dependencies:

  `npm install`.

4. Create a development and a test database in PostgreSQL.
5. Rename `template.env` to `.env` and fill in the values of the environment variables.

  **Note:** The NODE_ENV variable is preset to dev. The test scripts are called with setting its value in the scope of the script to test. This controls which database are used in which environment (dev database in dev environment, test database in test environment).

6. Run the migrations on both databases:

  `db-migrate up` for the development database

  `db-migrate up -e test` for the test database

## Running the test suite

1. Run one of the following commands:

  `npm run test` on Windows

  `npm run test-unix` on Linux and MacOS (not verified)

## Starting the development server

1. Run the following command:

  `npm run watch`

2. You can interact with the server via curl or an API testing application, such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).
