CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE IF NOT EXISTS products (
id SERIAL PRIMARY KEY,
owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
title TEXT NOT NULL,
image TEXT,
description TEXT,
pricePromo NUMERIC(12,2),
price NUMERIC(12,2) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Users dummy
-- INSERT INTO users (email, password)
-- VALUES
-- ('alice@example.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8t2E8m5rEwUj1k7V/6Xh9P/ue9sW5e'), -- password: password123
-- ('bob@example.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8t2E8m5rEwUj1k7V/6Xh9P/ue9sW5e'),   -- password: password123
-- ('carol@example.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8t2E8m5rEwUj1k7V/6Xh9P/ue9sW5e');  -- password: password123

-- Products dummy
-- INSERT INTO products (owner_id, title, image, description, price_promo, price)
-- VALUES
-- (1, 'Wireless Mouse', 'https://example.com/images/mouse.jpg', 'Mouse nirkabel ergonomis', 150000, 200000),
-- (1, 'Mechanical Keyboard', 'https://example.com/images/keyboard.jpg', 'Keyboard mekanik RGB', NULL, 750000),
-- (2, 'Gaming Headset', 'https://example.com/images/headset.jpg', 'Headset stereo gaming', 300000, 450000),
-- (2, 'USB-C Hub', 'https://example.com/images/hub.jpg', 'Hub 7-in-1 USB-C', NULL, 250000),
-- (3, 'Webcam HD', 'https://example.com/images/webcam.jpg', 'Webcam 1080p untuk streaming', 350000, 500000),
-- (3, 'Laptop Stand', 'https://example.com/images/stand.jpg', 'Stand laptop aluminium', NULL, 200000);
