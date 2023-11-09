#Shoe Catalogue Tests
[![Node.js CI](https://github.com/Kat-mmm/shoe-catalogue-with-api/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Kat-mmm/shoe-catalogue-with-api/actions/workflows/nodejs.yml)

# Shoes Catalogue API

This API provides endpoints for managing a shoes catalogue and a shopping cart.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Shoes API](#shoes-api)
- [Cart API](#cart-api)
- [Database Schema](#database-schema)

## Installation

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Kat-mmm/shoe-catalogue-with-api
```

2. Install dependencies:

```bash
cd shoe-catalogue-with-api
npm install
```

3. Set up your database connection in `config.js`.

4. Start the server:

```bash
npm start
```

## Usage

To use the API, you'll need to make HTTP requests to the provided endpoints. You can integrate these endpoints into your frontend or use a tool like Postman for testing.

## API Endpoints

Below are the available API endpoints:

- [Shoes API Endpoints](#shoes-api-endpoints)
- [Cart API Endpoints](#cart-api-endpoints)

## Shoes API

### Shoes API Endpoints

- `GET /api/shoes` - Retrieves all shoes.
- `GET /api/shoes/brand/:brandname` - Retrieves shoes by brand.
- `GET /api/shoes/size/:size` - Retrieves shoes by size.
- `GET /api/shoes/color/:color` - Retrieves shoes by color.
- `GET /api/shoes/brand/:brandname/size/:size` - Retrieves shoes by brand and size.
- `GET /api/shoes/color/:color/size/:size` - Retrieves shoes by color and size.
- `GET /api/shoes/brand/:brandname/color/:color` - Retrieves shoes by brand and color.
- `GET /api/shoes/brand/:brandname/size/:size/color/:color` - Retrieves shoes by brand, size, and color.
- `POST /api/shoes/sold/:shoeId` - Updates the stock level of a shoe.
- `POST /api/shoes` - Adds a new shoe to the stock.

## Cart API

### Cart API Endpoints

- `GET /api/cart/get` - Retrieves the user's cart.
- `GET /api/cart/shoes/get` - Retrieves the shoes in the user's cart with quantities.
- `POST /api/cart/add/:shoeId` - Adds a shoe to the user's cart.
- `POST /api/cart/remove/:shoeid` - Removes a shoe from the user's cart.
- `POST /api/cart/quantity/reduce/:shoeid` - Reduces the quantity of a specific shoe in the user's cart.
- `POST /api/cart/clear/all` - Clears the user's cart.
- `POST /api/cart/shoes/pay` - Processes payment for the items in the cart.

## Database Schema

This API uses a PostgreSQL database with the following schema:

## Database Schema

### `shoes` Table

This table stores information about shoes available in the catalogue.

| Field    | Type          | Description              |
|----------|---------------|--------------------------|
| id       | SERIAL        | Primary key              |
| color    | VARCHAR(255)  | Color of the shoe        |
| brand    | VARCHAR(255)  | Brand of the shoe        |
| price    | INTEGER       | Price of the shoe        |
| size     | INTEGER       | Size of the shoe         |
| in_stock | INTEGER       | Number of available shoes|
| img_url  | VARCHAR(255)  | URL of the shoe's image  |

### `users` Table

This table stores information about registered users.

| Field     | Type           | Description                         |
|-----------|----------------|-------------------------------------|
| id        | SERIAL         | Primary key                         |
| name      | VARCHAR(255)   | Name of the user                    |
| email     | VARCHAR(255)   | Email address of the user (unique)   |
| password  | VARCHAR(255)   | Encrypted password of the user       |
| is_admin  | BOOLEAN        | Indicates if the user is an admin    |

### `cart` Table

This table tracks the items in a user's shopping cart.

| Field      | Type          | Description                                       |
|------------|---------------|---------------------------------------------------|
| id         | SERIAL        | Primary key                                       |
| user_id    | INTEGER       | Foreign key referencing the user's id            |
| shoe_id    | INTEGER       | Foreign key referencing the shoe's id            |
| quantity   | INTEGER       | Number of the same shoe in the user's cart        |

The `shoe_id` field in the `cart` table references the `id` field in the `shoes` table.
