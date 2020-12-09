# Expressjs-Project-Template
A project template using Express.js as a Node.js framework.

## Project Status

[![Github license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/hasimy-as/Expressjs-Project-Template/master/LICENSE)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://gitHub.com/hasimy-as/Expressjs-Project-Template)


## Version

Current app version is on v1.1.

## Usage

```
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start

# Unit/Integration testing
npm run test
npm run cover // To create a coverage report

# Initialize mongodb
mongod

# Post scriptum
- When unit testing, be sure to initialize mongodb first
so the database-related section can be tested.

- Do not forget to change the controller-test section for
the :id at line 51 to an existing id of a data on your
database to ensure the integration test works properly.

```

## Endpoints

```
# Routes
ROOT          {{url}}/
POST          {{url}}/api/users
GET           {{url}}/api/users
GET BY ID     {{url}}/api/users/:id
PUT           {{url}}/api/users/:id
DELETE        {{url}}/api/users/:id

```

## Licensed under [MIT](https://raw.githubusercontent.com/hasimy-as/Expressjs-Project-Template/master/LICENSE)

Happy coding!

~Hasimy
