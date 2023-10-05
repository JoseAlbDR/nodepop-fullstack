# NodePop - Classified Ads

# NodePop Application

NodePop is a web application that allows users to buy and sell products. This README provides an overview of the application's features, setup, and usage.

## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
   - [Cookies](#cookies)
   - [Account Creation Process](#account-creation-process)
   - [Login Process](#login-process)
   - [CRUD Operations](#crud-operations)
   - [CRUD Operations on Products](#crud-operations-on-products)
   - [CRUD Operations on Users](#crud-operations-on-users)
   - [API Documentation](#api-documentation)
6. [Folder Structure](#folder-structure)
7. [Contributing](#contributing)
8. [License](#license)

## Features
NodePop offers the following features:

- User registration and authentication
- Product listing and browsing
- Product creation, editing, and deletion
- User profile management
- User role management (admin, user, tester)
- User avatars and uploaded image handling
- Data population for tester users
- Application statistics tracking
- JWT-based authentication and authorization
- Rate limiting for API endpoints
- Swagger API documentation

## Getting Started
Follow these steps to install NodePop on your system:

## Installation

### Clone the Repository

To get started, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/JoseAlbDR/nodepop-fullstack.git

cd nodepop-fullstack

npm run setup-project
```

## Configuration
Before running the application, you need to configure environment variables in a `.env` file. Copy and paste the following content into a file named `.env` at the project's root and fill in the values as needed:

```plaintext
NODE_ENV=development or production
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
```

## Usage
To start the NodePop application, run the following command:

### Development enviroment

If you want to run the app in development first make sure that `NODE_ENV` env variable in `.env` file is set to `development` then run the following commands:

```shell
npm run setup-project

npm run dev
```

### Production environment

If you want to run the app in development first make sure that `NODE_ENV` env variable in `.env` file is set to `production` then run the following commands:

```shell
npm setup-production-build

npm start
```






