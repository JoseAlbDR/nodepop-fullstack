# NodePop - Classified Ads

## API Docs
[Documentation](https://nodepop.jadero.dev/api/v1/docs/)

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

# Cookies

NodePop uses cookies for user authentication and session management. When a user logs in, a JSON Web Token (JWT) is generated on the server and sent to the client as a cookie. This token contains information about the user's authentication status and session. The cookie is then included in subsequent requests to authenticate the user and maintain their session. It ensures that users don't have to re-enter their credentials for each request.

# Account Creation Process

## Registration

Users can create an account by navigating to the registration page and providing their name, email, password, and other optional information.

## Validation

The provided information is validated on the server to ensure it meets the required criteria (e.g., valid email format, strong password).

## User Role Assignment

During registration, NodePop automatically assigns a role to the user based on certain conditions. For example, the first registered user might be assigned the "admin" role, while subsequent users get the "user" role.

## User Creation

After validation, a new user account is created in the database. The user's password is securely hashed before storage.

## Folder Creation

A folder is created for the user (typically using their unique user ID) to store their files, such as avatars and uploaded images.

## JWT Generation

Upon successful registration, the user is issued a JWT token for authentication.

# Login Process

## Login

Users can log in by providing their registered email and password on the login page.

## Validation

The provided credentials are validated on the server.

## Authentication

If the credentials are valid, NodePop checks the user's role. If the user's role is "tester," a database population process is triggered to create sample data.

## JWT Generation

Upon successful login, the user is issued a JWT token, which is sent to the client as a cookie for subsequent authentication.

# CRUD Operations

## CRUD Operations on Products

NodePop allows authorized users ("user" and "admin" roles) to perform CRUD operations on products.

### Create Product

Users can create a new product by providing product details such as name, price, image, and tags. Users may also upload an image for the product. Upon creation, the product is associated with the user who created it.

### Read Product

Users can view a list of all products. Additionally, users can view details of a specific product by clicking on its listing. The product details include its name, price, image, tags, and the user who created it.

### Update Product

Users can update the details of a product they created. They can modify the name, price, image, tags, and other attributes. Users can also upload a new image for the product.

### Delete Product

Users can delete a product they created. This action removes the product from the system.

## CRUD Operations on Users

Certain authorized users ("user" and "admin" roles) have the privilege to perform CRUD operations on user accounts.

### Update User

Admins can update the details of any user account, including their name, email, role, and avatar. They can also change the user's password.

### Delete User

Admins can delete any user account, including all associated data and files. This action is irreversible and permanently removes the user from the system.

# API Documentation

NodePop provides API documentation using Swagger. You can access the API documentation at [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs) when the application is running.

## Folder Structure
The folder structure of NodePop is organized as follows:

```paintext
nodepop/
  ├── src/
  │   ├── controllers/
  │   ├── db/
  │   ├── dtos/
  │   ├── errors/
  │   ├── middleware/
  │   ├── models/
  │   ├── public/
  │   ├── routes/
  │   ├── services/
  │   ├── types/
  │   ├── utils/
  │   └── index.ts
  ├── .env
  ├── .gitignore
  ├── package.json
  ├── README.md
  └── ...other project files

```





