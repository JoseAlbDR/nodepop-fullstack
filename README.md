
# Nodepop Backend

Nodepop Backend is a server application built with Node.js and Express that provides services for a fictional product-selling application. This repository contains the source code and instructions for running the application in both development and production environments.

## Usage Instructions

Follow the steps below to run the Nodepop Backend application in your local environment.

### Clone the Repository

To get started, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/JoseAlbDR/nodepop-fullstack.git
cd nodepop-fullstack
```

### Environment Configuration

Before running the application, you need to configure environment variables in a `.env` file. Copy and paste the following content into a file named `.env` at the project's root and fill in the values as needed:

```plaintext
NODE_ENV=development or production
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d
```

### Development enviroment

If you want to run the app in development first make sure that `NODE_ENV` env variable in `.env` file is set to `development` then run the following commands:

```shell
npm run setup-project
npm run dev
```

### Production environment

If you want to run the app in development first make sure that `NODE_ENV` env variable in `.env` file is set to `production` then run the following commands:

```shell
npm setup-production-app
npm start
```



