# Storefront API Requirements

This document describes the endpoints and database schemas of the Storefront API.

## Authentication

### Admin user

The server automatically creates an admin user in the database if it is not present. It uses the environment variables from the `.env` file for this.

This ensures that there is always at least one user that can be authenticated and create new resources in the database.

### Login

For authentication, the `Authorization` header of the request must be set. The value to be used is `Bearer <token>`, where the token is a JWT (JSON Web Token) provided as the response on a successful login.

A login can be performed by sending the password of a user in  `POST` request body to the `/users/<user_id>` endpoint, as described in detail [here](#post-usersuser_id).

## Endpoints

| HTTP method | Route | Link |
| :-- | :-- | :-- |
| `GET` | `/categories` | [Read more](#get-categories) |
| `GET` | `/categories/<category_id>` | [Read more](#get-categoriescategory_id) |
| `POST` | `/categories` | [Read more](#post-categories) |
| `GET` | `/products` | [Read more](#get-products) |
| `GET` | `/products/<product_id>` | [Read more](#get-productsproduct_id) |
| `POST` | `/products` | [Read more](#post-products) |
| `GET` | `/users` | [Read more](#get-users) |
| `GET` | `/users/<user_id>` | [Read more](#get-usersuser_id) |
| `POST` | `/users` | [Read more](#post-users) |
| `POST` | `/users/<user_id>` | [Read more](#post-usersuser_id) |
| `GET` | `/users/<user_id>/orders` | [Read more](#get-usersuser_idorders) |
| `POST` | `/users/<user_id>/orders` | [Read more](#post-usersuser_idorders) |

### GET /categories

Fetches all categories from the database.

#### Requires authentication

No

#### Response payload

```json
[
  {
    "id": "number: The category id",
    "name": "string: The category name"
  }
]
```

### GET /categories/<category_id>

Fetches a single category from the database.

#### Requires authentication

No

#### Response payload

```json
{
  "id": "number: The category id",
  "name": "string: The category name"
}
```

### POST /categories

Creates a new category in the database.

#### Requires authentication

Yes

#### Request payload

```json
{
  "name": "string: The category name"
}
```

#### Response payload

```json
{
  "id": "number: The category id",
  "name": "string: The category name"
}
```

### GET /products

Fetches all products from the database.

#### Requires authentication

No

#### Request arguments

`?popular=yes`: (Optional) Fetches the five most popular product based on order quantity.

`?category=<number>`: (Optional) Fetches all products in the selected category.

`?popular=yes&category=<number>`: (Optional) If both arguments are supplied, fetches the five most popular products in the selected category.

#### Response payload

```json
[
  {
    "id": "number: The product id",
    "name": "string: The product name",
    "price": "number: The product price",
    "category": {
        "id": "number: The id of the category the product belongs to",
        "name": "number: The name of the category the product belongs to"
    }
  }
]
```

### GET /products/<product_id>

Fetches a single product from the database.

#### Requires authentication

No

#### Response payload

```json
{
  "id": "number: The product id",
  "name": "string: The product name",
  "price": "number: The product price",
  "category": {
      "id": "number: The id of the category the product belongs to",
      "name": "number: The name of the category the product belongs to"
  }
}
```

### POST /products

Creates a new product in the database.

#### Requires authentication

Yes

#### Request payload

```json
{
  "name": "string: The product name",
  "price": "number: The product price in integer - count in subunits for currencies that use it",
  "category": "number: The id of the category the product belongs to"
}
```

#### Response payload

```json
{
  "id": "number: The product id",
  "name": "string: The product name",
  "price": "number: The product price",
  "category": {
      "id": "number: The id of the category the product belongs to",
      "name": "number: The name of the category the product belongs to"
  }
}
```

### GET /users

Fetches all users from the database.

#### Requires authentication

Yes

#### Response payload

```json
[
  {
    "id": "string: The user id (username)",
    "firstName": "string: The first name of the user.",
    "lastName": "string: The last name of the user"
  }
]
```

### GET /users/<user_id>

Fetches a single user from the database.

#### Requires authentication

Yes

#### Response payload

```json
{
  "id": "string: The user id (username)",
  "firstName": "string: The first name of the user.",
  "lastName": "string: The last name of the user"
}
```

### POST /users

Creates a new user in the database.

#### Requires authentication

Yes

#### Request payload

```json
{
  "id": "string: The user id (username)",
  "firstName": "string: The first name of the user.",
  "lastName": "string: The last name of the user",
  "password": "string: The password of the user"
}
```

#### Response payload

```json
{
  "id": "string: The user id (username)",
  "firstName": "string: The first name of the user.",
  "lastName": "string: The last name of the user"
}
```

### POST /users/<user_id>

Performs a login for the user.

#### Requires authentication

No

#### Request payload

```json
{
  "password": "string: The password of the user"
}
```

#### Response payload

A signed JWT token associated with the user.

### GET /users/<user_id>/orders

Fetches all active orders of the specified user from the database.

#### Requires authentication

Yes

#### Request arguments

`?status=completed`: (Optional) Fetches all completed orders of the specified user from the database.

#### Response payload

```json
[
  {
    "id": "number: The order id",
    "userId": "string: The user id (username)",
    "status": "string: The status of the order (active/completed)",
    "products": [{
      "product": {
        "id": "number: The product id",
        "name": "string: The product name",
        "price": "number: The product price",
        "category": {
            "id": "number: The id of the category the product belongs to",
            "name": "number: The name of the category the product belongs to"
        }
      },
      "quantity": "number: The quantity ordered from the specified product"
    }],
    "basketValue": "number: The total basket value of the order"
  }
]
```

### POST /users/<user_id>/orders

Creates a new order for the specified user in the database.

#### Requires authentication

Yes

#### Request payload

```json
[
  {
    "productId": "number: The id of the product to be ordered",
    "quantity": "number: The quantity of the product to be ordered"
  }
]
```

#### Response payload

```json
{
  "id": "number: The order id",
  "userId": "string: The user id (username)",
  "status": "string: The status of the order (active/completed)",
  "products": [{
    "product": {
      "id": "number: The product id",
      "name": "string: The product name",
      "price": "number: The product price",
      "category": {
          "id": "number: The id of the category the product belongs to",
          "name": "number: The name of the category the product belongs to"
      }
    },
    "quantity": "number: The quantity ordered from the specified product"
  }],
  "basketValue": "number: The total basket value of the order"
}
```

## Database Schema

### Table categories

| Column name | Type | Constraint |
| :-- | :-- | :-- |
| id | serial | primary key |
| name | varchar(100) | not null |

### Table products

| Column name | Type | Constraint |
| :-- | :-- | :-- |
| id | serial | primary key |
| name | varchar(100) | not null |
| price | integer | not null |
| category_id | integer | foreign key referencing categories.id |

### Table users

| Column name | Type | Constraint |
| :-- | :-- | :-- |
| id | varchar(50) | primary key |
| first_name | varchar(255) | not null |
| last_name | varchar(255) | not null |
| password_hash | text | not null |

### Table orders

| Column name | Type | Constraint |
| :-- | :-- | :-- |
| id | serial | primary key |
| user_id | varchar(50) | foreign key referencing users.id |
| is_active | boolean | not null,  default=true |

### Table order_items

| Column name | Type | Constraint |
| :-- | :-- | :-- |
| order_id | integer | foreign key referencing orders.id |
| product_id | integer | foreign key referencing products.id |
| quantity | integer | not null,  default=1 |

## Data Shapes

### Category

```json
{
  "id": "number: The category id",
  "name": "string: The category name"
}
```

### Product

```json
{
  "id": "number: The product id",
  "name": "string: The product name",
  "price": "number: The product price",
  "category": {
      "id": "number: The id of the category the product belongs to",
      "name": "number: The name of the category the product belongs to"
  }
}
```

### User

```json
{
  "id": "string: The user id (username)",
  "firstName": "string: The first name of the user.",
  "lastName": "string: The last name of the user",
  "password": "string: (Optional, only used when creating a new user) The password of the user"
}
```

### Order

```json
{
  "id": "number: The order id",
  "userId": "string: The user id (username)",
  "status": "string: The status of the order (active/completed)",
  "products": [{
    "product": {
      "id": "number: The product id",
      "name": "string: The product name",
      "price": "number: The product price",
      "category": {
          "id": "number: The id of the category the product belongs to",
          "name": "number: The name of the category the product belongs to"
      }
    },
    "quantity": "number: The quantity ordered from the specified product"
  }],
  "basketValue": "number: The total basket value of the order"
}
```
