## :computer: api-express-sequelize

:bulb: The aim of this application is to practice backend software engineering skills using several technologies. Therefore, this application is not business oriented.

### :books: About the project

This application consists of a simple Library System, in which users may rent, return and renew a book. Moreover, users can be created based on a role, whereas 'admin' role may also create new book registers, while 'users' role may only perform rental actions.

## Technologies and Libraries

- **[`NodeJS`](https://nodejs.org/)**
- **[`ExpressJS`](https://expressjs.com/)**
- **[`Typescript`](https://www.typescriptlang.org/)**
- **[`Sequelize`](https://sequelize.org/)**
- **[`Docker`](https://www.docker.com/)**
- **[`Swagger`](https://swagger.io/)**
- **[`JWT`](https://jwt.io/)**
- **[`Bcrypt`](https://www.npmjs.com/package/bcrypt)**
- **[`Jest`](https://jestjs.io/)**

## Getting Started

### Prerequisites

- NodeJS
- NPM
- Docker

### Running a local MySQL database using Docker

Run the following command to start a local **development** and **test** MySQL database using docker
```bash
$ docker compose-up -d
```

After the previous command is executed, two distinct containers must be running, which may be checked by typing
```bash
$ docker ps
```

![image](https://user-images.githubusercontent.com/80550514/202021391-aab315aa-5251-48ef-a53b-ff0dc3f69dfa.png)


### Running the server locally

First, install all requires dependencies

```bash
$ npm install
```

Since Sequelize don't create the database, it is required to create it before start the application:

```bash
$ npx sequelize-cli db:create
```

After the database is created we are able to run the application:

```bash
$ npm run dev
```

The server is set to run on port 8080 (*please see src/config/environment.ts*)

### Testing

Before running tests, you will probably have to create the test database:

```bash
$ npx sequelize-cli db:create --env=test
```

```bash
# Unit and E2E tests
$ npm run test

# Test coverage report
$ npm run test:cov
```

## :page_with_curl: API Documentation

API documentation was built using Swagger, and may be assessed in the following endpoint:

http://localhost:8080/api-docs/

### Authentication

Most endpoints are protected by a Bearer token, which is obtained by registering or logging in (*see API Documentation*)

## Contact
https://www.linkedin.com/in/leonardo-antonio-pinto/
