-- Restaurants Table
CREATE TABLE restaurants
(
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT,
    type VARCHAR(100),
    contact_info TEXT,
    accepts_online_orders BOOLEAN DEFAULT FALSE
);

-- Categories Table
CREATE TABLE categories
(
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Nutritional Information Table
CREATE TABLE nutritional_info
(
    nutritional_id SERIAL PRIMARY KEY,
    serving_size VARCHAR(100),
    calories INT,
    calories_from_fat INT,
    total_fat DECIMAL(5, 2),
    saturated_fat DECIMAL(5, 2),
    trans_fat DECIMAL(5, 2),
    cholesterol DECIMAL(5, 2),
    sodium DECIMAL(5, 2),
    total_carbohydrates DECIMAL(5, 2),
    dietary_fiber DECIMAL(5, 2),
    sugars DECIMAL(5, 2),
    protein DECIMAL(5, 2),
    vitamin_a_percentage DECIMAL(5, 2),
    vitamin_c_percentage DECIMAL(5, 2),
    calcium_percentage DECIMAL(5, 2),
    iron_percentage DECIMAL(5, 2)
);

-- Base Menu Items Table
CREATE TABLE base_menu_items
(
    base_item_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(restaurant_id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(category_id),
    base_price DECIMAL(10, 2),
    standard_nutritional_info_id INT REFERENCES nutritional_info(nutritional_id)
);

-- Item Variations Table
CREATE TABLE item_variations
(
    variation_id SERIAL PRIMARY KEY,
    base_item_id INT REFERENCES base_menu_items(base_item_id),
    variation_name VARCHAR(255),
    additional_price DECIMAL(10, 2),
    variation_nutritional_info_id INT REFERENCES nutritional_info(nutritional_id)
);

-- Ingredients Table
CREATE TABLE ingredients
(
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    allergen_info TEXT,
    nutritional_info_id INT REFERENCES nutritional_info(nutritional_id)
);

-- Menu Item Ingredients Table
CREATE TABLE menu_item_ingredients
(
    base_item_id INT REFERENCES base_menu_items(base_item_id),
    ingredient_id INT REFERENCES ingredients(ingredient_id),
    quantity DECIMAL(10, 2),
    optional BOOLEAN,
    PRIMARY KEY (base_item_id, ingredient_id)
);

-- Allergens Table
CREATE TABLE allergens
(
    allergen_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Ingredient Allergens Table
CREATE TABLE ingredient_allergens
(
    ingredient_id INT REFERENCES ingredients(ingredient_id),
    allergen_id INT REFERENCES allergens(allergen_id),
    PRIMARY KEY (ingredient_id, allergen_id)
);

-- Users Table
CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dietary_preferences TEXT,
    dietary_restrictions TEXT
);

-- User Meal Plans Table
CREATE TABLE user_meal_plans
(
    plan_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    meal_time VARCHAR(255),
    item_id INT REFERENCES base_menu_items(base_item_id),
    notes TEXT
);

-- User Meal Preferences Table
CREATE TABLE user_meal_preferences
(
    user_id INT REFERENCES users(user_id),
    item_id INT REFERENCES base_menu_items(base_item_id),
    user_like BOOLEAN,
    PRIMARY KEY (user_id, item_id)
);

-- Dietary Restrictions Table
CREATE TABLE dietary_restrictions
(
    restriction_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- User Dietary Restrictions Table
CREATE TABLE user_dietary_restrictions
(
    user_id INT REFERENCES users(user_id),
    restriction_id INT REFERENCES dietary_restrictions(restriction_id),
    PRIMARY KEY (user_id, restriction_id)
);

-- User Health Profile Table
CREATE TABLE user_health_profiles
(
    profile_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    age INT,
    gender VARCHAR(50),
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2),
    activity_level VARCHAR(255),
    goal VARCHAR(255)
);
