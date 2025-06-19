-- Seed data for X-Price Tracker

-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets', '/images/categories/electronics.jpg'),
('Clothing', 'clothing', 'Fashion and apparel', '/images/categories/clothing.jpg'),
('Home & Garden', 'home-garden', 'Home improvement and garden supplies', '/images/categories/home-garden.jpg'),
('Books', 'books', 'Books and educational materials', '/images/categories/books.jpg'),
('Sports', 'sports', 'Sports and fitness equipment', '/images/categories/sports.jpg'),
('Beauty', 'beauty', 'Beauty and personal care products', '/images/categories/beauty.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, category, current_price, original_price, price_change, image_url, brand) VALUES
('Wireless Bluetooth Headphones', 'Premium wireless headphones with active noise cancellation and 30-hour battery life', 'Electronics', 8999.00, 12999.00, -30.77, '/images/products/headphones.jpg', 'Sony'),
('Bluetooth Portable Speaker', 'Waterproof portable speaker with 360-degree sound and 12-hour battery', 'Electronics', 6499.00, 7999.00, -18.75, '/images/products/speaker.jpg', 'JBL'),
('4K Smart TV 55 inch', 'Ultra HD Smart TV with HDR support and built-in streaming apps', 'Electronics', 45999.00, 54999.00, -16.36, '/images/products/tv.jpg', 'Samsung'),
('Gaming Laptop', 'High-performance gaming laptop with RTX graphics and 16GB RAM', 'Electronics', 89999.00, 99999.00, -10.00, '/images/products/laptop.jpg', 'ASUS'),
('Smartphone 128GB', 'Latest smartphone with triple camera system and 5G connectivity', 'Electronics', 24999.00, 29999.00, -16.67, '/images/products/smartphone.jpg', 'OnePlus'),
('Smartwatch', 'Fitness tracking smartwatch with heart rate monitor and GPS', 'Electronics', 12999.00, 15999.00, -18.75, '/images/products/smartwatch.jpg', 'Apple'),
('Wireless Earbuds', 'True wireless earbuds with noise cancellation and wireless charging', 'Electronics', 7999.00, 9999.00, -20.00, '/images/products/earbuds.jpg', 'Apple'),
('Digital Camera', 'Mirrorless digital camera with 4K video recording and image stabilization', 'Electronics', 54999.00, 64999.00, -15.38, '/images/products/camera.jpg', 'Canon'),
('Gaming Console', 'Next-generation gaming console with 4K gaming and ray tracing', 'Electronics', 49999.00, 54999.00, -9.09, '/images/products/console.jpg', 'Sony'),
('Tablet 10 inch', 'High-resolution tablet with stylus support and all-day battery', 'Electronics', 32999.00, 39999.00, -17.50, '/images/products/tablet.jpg', 'iPad'),
('Fitness Tracker', 'Advanced fitness tracker with sleep monitoring and water resistance', 'Electronics', 4999.00, 6999.00, -28.57, '/images/products/fitness-tracker.jpg', 'Fitbit'),
('Drone with Camera', '4K camera drone with 3-axis gimbal and intelligent flight modes', 'Electronics', 64999.00, 79999.00, -18.75, '/images/products/drone.jpg', 'DJI'),
('Home Theater System', '5.1 surround sound system with wireless subwoofer', 'Electronics', 34999.00, 44999.00, -22.22, '/images/products/home-theater.jpg', 'Bose'),
('VR Headset', 'Virtual reality headset with hand tracking and wireless connectivity', 'Electronics', 29999.00, 39999.00, -25.00, '/images/products/vr-headset.jpg', 'Meta'),
('Smart Home Assistant', 'Voice-controlled smart speaker with home automation features', 'Electronics', 7999.00, 9999.00, -20.00, '/images/products/smart-speaker.jpg', 'Amazon'),
('Portable Power Bank', 'High-capacity power bank with fast charging and multiple ports', 'Electronics', 2999.00, 3999.00, -25.00, '/images/products/power-bank.jpg', 'Anker')
ON CONFLICT DO NOTHING;

-- Create a demo user (password: 'password')
INSERT INTO users (name, email) VALUES
('Demo User', 'demo@example.com')
ON CONFLICT (email) DO NOTHING;

-- Get the demo user ID for further operations
DO $$
DECLARE
    demo_user_id UUID;
    product_record RECORD;
BEGIN
    -- Get demo user ID
    SELECT id INTO demo_user_id FROM users WHERE email = 'demo@example.com';
    
    -- Insert product stores for each product
    FOR product_record IN SELECT id, current_price FROM products LOOP
        -- Amazon store
        INSERT INTO product_stores (product_id, store_name, store_url, store_price)
        VALUES (
            product_record.id,
            'Amazon',
            'https://amazon.in/product/' || product_record.id,
            product_record.current_price
        ) ON CONFLICT DO NOTHING;
        
        -- Flipkart store with slight price variation
        INSERT INTO product_stores (product_id, store_name, store_url, store_price)
        VALUES (
            product_record.id,
            'Flipkart',
            'https://flipkart.com/product/' || product_record.id,
            product_record.current_price + (random() * 1000 - 500)
        ) ON CONFLICT DO NOTHING;
        
        -- Insert price history (30 data points over last 90 days)
        FOR i IN 1..30 LOOP
            INSERT INTO price_history (product_id, price, source, recorded_at)
            VALUES (
                product_record.id,
                product_record.current_price + (random() * 5000 - 2500),
                'system',
                CURRENT_TIMESTAMP - (random() * interval '90 days')
            );
        END LOOP;
    END LOOP;
    
    -- Insert sample price alerts for demo user (first 5 products)
    INSERT INTO price_alerts (user_id, product_id, target_price)
    SELECT 
        demo_user_id,
        p.id,
        p.current_price * 0.9 -- 10% below current price
    FROM products p 
    LIMIT 5
    ON CONFLICT (user_id, product_id) DO NOTHING;
    
END $$;
