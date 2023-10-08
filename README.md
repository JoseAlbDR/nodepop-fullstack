# NodePop - Classified Ads

## API Docs
[Production API Documentation](https://nodepop.jadero.dev/api/v1/docs/)

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
Navigate to `http://locahost:5137`

### Production environment

If you want to run the app in development first make sure that `NODE_ENV` env variable in `.env` file is set to `production` then run the following commands:

```shell
npm setup-production-build

npm start
```
Navigate to `http://locahost:3000` or whatever por you setup in .env file

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

#### Filter Products: 
Users can filter products based on specific criteria such as price range, availability (on sale or not), and tags. Filters can be applied using query parameters when fetching the list of products.

Example Query to Filter Products by Price Range (Min Price: 100, Max Price: 500):
```
/api/v1/products?price=100-500
```

#### Sort Products: 
Users can sort the list of products by different attributes, including name, price, and creation date. Sorting options are available as query parameters.

Example Query to Sort Products by Price in Ascending Order:
```
/api/v1/products?sort=lowest
```

#### Pagination: 
When viewing a list of products, users can navigate through multiple pages of results. The pagination feature allows users to specify the page number and the number of items per page.

Example Query to Get the Second Page of Products with 10 Items per Page:
```
/api/v1/products?page=2&limit=10
```

#### Full Filter, Sort, Pagination Query Example

For products with letter `a`, that are on sale `onSale=on-sale`, containing tag mobile `tags=mobile`, sort by oldest products `sort=oldest`, limited to 10 products per page `limit=10`, showing the page 2 `page=2` and in a 119 to 979 price range `price=119-979`
```
http://localhost:3000/api/v1/products?name=a&onSale=on+sale&tags=mobile&sort=oldest&limit=10&page=2&price=119-979
```

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





