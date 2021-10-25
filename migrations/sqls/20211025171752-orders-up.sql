CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) REFERENCES users(id),
  is_active BOOLEAN NOT NULL DEFAULT 'true'
);

CREATE TABLE order_items (
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1
);
