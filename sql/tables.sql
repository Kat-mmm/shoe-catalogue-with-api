CREATE TABLE shoes (
    id SERIAL PRIMARY KEY,
    color VARCHAR(255),
    brand VARCHAR(255),
    price INTEGER,
    size INTEGER,
    in_stock INTEGER,
    img_url VARCHAR(255)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    shoe_id INTEGER REFERENCES shoes(id),
    quantity INTEGER,
    FOREIGN KEY (shoe_id) REFERENCES shoes(id)
);