# Node.js TypeORM Demo

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contact](#contact)

## Introduction

This Node.js application is a demo project built with [TypeORM](https://typeorm.io/) for database management, [routing-controllers](https://github.com/typestack/routing-controllers) for handling routes and controllers, and [Swagger UI](https://swagger.io/tools/swagger-ui/) for API documentation.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone the repository:

    - git clone https://github.com/gevorgabgaryan/node-ts-typeorm-demo.git
    - cd node-ts-typeorm-demo

## Configuration

 1. Create a .env file based on the provided env-sample file:

    - cp .env-sample .env

 2. Open the .env file in a text editor and fill
    in the required configuration values,
    such as database connection details:
    ```
        NODE_ENV=production
        PORT=3115
        MYSQL_DB_PORT=3306
        MYSQL_DB_EXPOSE_PORT=3306
        MYSQL_USERNAME=yourusername
        MYSQL_PASSWORD=yourpassword
        MYSQL_DB_NAME=DBNAME
        MYSQL_HOST=db
    ```
    Adjust the values according to your specific setup.

## Usage
  1.  Build and start the application
      -  docker-compose up --build

  2. The application will be running on
      -  http://localhost:4000

## API Documentation


 1.  API documentation is generated using Swagger UI.
     After starting the application,
     you can access the documentation at
     - http://localhost:4000/api-docs

## Contact
   For any inquiries, please contact Gevorg
   at gevorg.gak@gmail.com