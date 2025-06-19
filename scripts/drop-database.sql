-- Drop all tables and database objects for X-Price Tracker

-- Drop triggers first
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_accounts_updated_at ON accounts;
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_product_stores_updated_at ON product_stores;
DROP TRIGGER IF EXISTS update_price_alerts_updated_at ON price_alerts;
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop indexes
DROP INDEX IF EXISTS idx_products_category;
DROP INDEX IF EXISTS idx_products_name;
DROP INDEX IF EXISTS idx_price_history_product_id;
DROP INDEX IF EXISTS idx_price_history_recorded_at;
DROP INDEX IF EXISTS idx_price_alerts_user_id;
DROP INDEX IF EXISTS idx_price_alerts_product_id;
DROP INDEX IF EXISTS idx_price_alerts_active;
DROP INDEX IF EXISTS idx_user_favorites_user_id;
DROP INDEX IF EXISTS idx_product_stores_product_id;

-- Drop tables in correct order (child tables first to avoid foreign key constraints)
DROP TABLE IF EXISTS user_favorites CASCADE;
DROP TABLE IF EXISTS price_alerts CASCADE;
DROP TABLE IF EXISTS price_history CASCADE;
DROP TABLE IF EXISTS product_stores CASCADE;
DROP TABLE IF EXISTS verification_tokens CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Confirm cleanup
SELECT 'Database cleanup completed successfully!' as status;
