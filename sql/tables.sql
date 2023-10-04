CREATE TABLE shoes (
    id SERIAL PRIMARY KEY,
    color VARCHAR(255),
    brand VARCHAR(255),
    price INTEGER,
    size INTEGER,
    in_stock INTEGER,
    img_url VARCHAR(255)
);