<h1 align="center">Book Manager API</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://typeorm.io/" target="blank"><img src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png" width="200" alt="TypeORM Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

<p align="center">API to manage books (v 1.0.0)</p>
<p align="center">Built on NestJs, TypeORM with TypeScript</p>

## Description

This project is an RESTful API to manage books.

### Features

- JWT Authentication / Authorization
- Wiston Logging (console and file)
- Multer File upload (books cover)
- Swagger RESTful API Documentation

## Clone Project

```git
git clone https://github.com/thiagotrs/book-manager-api.git
```

## Installation

```bash
$ npm install
```

## Configuration

Create an .env file in the root directory with these variables:

```
PORT = 3000
URL_SERVER = http://localhost:3000
JWT_SECRET = super-secret
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = localhost
TYPEORM_USERNAME = root
TYPEORM_PASSWORD = ''
TYPEORM_PORT = 3306
TYPEORM_DATABASE = bookmanagerdb
TYPEORM_SYNCHRONIZE = true
```

## Running the API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation API

URL: http://localhost:3000/api

## Author

Thiago Rotondo Sampaio - [GitHub](https://github.com/thiagotrs) / [Linkedin](https://www.linkedin.com/in/thiago-rotondo-sampaio) / [Email](mailto:thiagorot@gmail.com)

## License

This project use MIT license, see the file [LICENSE](.github/LICENSE.md) for more details

---

<p align="center">Develop by <a href="https://github.com/thiagotrs">Thiago Rotondo Sampaio</a></p>
