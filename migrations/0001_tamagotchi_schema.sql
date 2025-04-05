-- Migration number: 0001 	 2025-04-03
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tamagotchis;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS food_items;
DROP TABLE IF EXISTS evolution_types;
DROP TABLE IF EXISTS health_records;
DROP TABLE IF EXISTS breeding_records;
DROP TABLE IF EXISTS marketplace_listings;

-- Users table to store user information
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  fitness_device_connected BOOLEAN DEFAULT FALSE,
  location_tracking_enabled BOOLEAN DEFAULT FALSE
);

-- Evolution types/species available in the game
CREATE TABLE IF NOT EXISTS evolution_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  rarity INTEGER NOT NULL, -- 1-10 scale, 10 being most rare
  requirements TEXT NOT NULL, -- JSON string of requirements to evolve to this type
  image_path TEXT
);

-- Tamagotchis owned by users
CREATE TABLE IF NOT EXISTS tamagotchis (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  evolution_type_id INTEGER,
  age INTEGER DEFAULT 0, -- in days
  hunger INTEGER DEFAULT 50, -- 0-100 scale
  thirst INTEGER DEFAULT 50, -- 0-100 scale
  happiness INTEGER DEFAULT 50, -- 0-100 scale
  energy INTEGER DEFAULT 50, -- 0-100 scale
  health INTEGER DEFAULT 100, -- 0-100 scale
  cleanliness INTEGER DEFAULT 50, -- 0-100 scale
  weight REAL DEFAULT 10.0, -- in kg
  is_sick BOOLEAN DEFAULT FALSE,
  is_sleeping BOOLEAN DEFAULT FALSE,
  personality_traits TEXT, -- JSON string of personality traits
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_interaction DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  visual_attributes TEXT, -- JSON string of visual attributes
  dna_attributes TEXT, -- JSON string of DNA attributes for breeding
  is_pregnant BOOLEAN DEFAULT FALSE,
  pregnancy_start_date DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (evolution_type_id) REFERENCES evolution_types(id)
);

-- Activities performed by or with tamagotchis
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tamagotchi_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL, -- feeding, walking, playing, sleeping, etc.
  details TEXT, -- JSON string with activity details
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  impact_hunger INTEGER DEFAULT 0,
  impact_thirst INTEGER DEFAULT 0,
  impact_happiness INTEGER DEFAULT 0,
  impact_energy INTEGER DEFAULT 0,
  impact_health INTEGER DEFAULT 0,
  impact_cleanliness INTEGER DEFAULT 0,
  FOREIGN KEY (tamagotchi_id) REFERENCES tamagotchis(id)
);

-- Food items available in the game
CREATE TABLE IF NOT EXISTS food_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  nutrition_value INTEGER NOT NULL, -- 0-100 scale
  evolution_influence TEXT, -- JSON string of evolution influences
  price INTEGER NOT NULL,
  image_path TEXT
);

-- Health records for tamagotchis
CREATE TABLE IF NOT EXISTS health_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tamagotchi_id INTEGER NOT NULL,
  record_type TEXT NOT NULL, -- checkup, illness, treatment, etc.
  details TEXT NOT NULL, -- JSON string with health details
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tamagotchi_id) REFERENCES tamagotchis(id)
);

-- Breeding records between tamagotchis
CREATE TABLE IF NOT EXISTS breeding_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent1_id INTEGER NOT NULL,
  parent2_id INTEGER NOT NULL,
  match_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pregnancy_successful BOOLEAN,
  offspring_count INTEGER,
  offspring_ids TEXT, -- JSON array of offspring tamagotchi IDs
  FOREIGN KEY (parent1_id) REFERENCES tamagotchis(id),
  FOREIGN KEY (parent2_id) REFERENCES tamagotchis(id)
);

-- Marketplace listings for trading tamagotchis
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seller_id INTEGER NOT NULL,
  tamagotchi_id INTEGER NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  listing_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_auction BOOLEAN DEFAULT FALSE,
  end_date DATETIME,
  status TEXT DEFAULT 'active', -- active, sold, cancelled
  buyer_id INTEGER,
  sale_date DATETIME,
  FOREIGN KEY (seller_id) REFERENCES users(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id),
  FOREIGN KEY (tamagotchi_id) REFERENCES tamagotchis(id)
);

-- Create indexes for performance
CREATE INDEX idx_tamagotchis_user_id ON tamagotchis(user_id);
CREATE INDEX idx_activities_tamagotchi_id ON activities(tamagotchi_id);
CREATE INDEX idx_health_records_tamagotchi_id ON health_records(tamagotchi_id);
CREATE INDEX idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX idx_breeding_records_parents ON breeding_records(parent1_id, parent2_id);

-- Initial evolution types
INSERT INTO evolution_types (name, description, rarity, requirements, image_path) VALUES 
  ('Baby Blob', 'The starting form of all Tamagotchis', 1, '{}', '/images/evolutions/baby_blob.png'),
  ('Healthy Sprout', 'A well-balanced young Tamagotchi', 2, '{"min_health": 70, "min_age": 5}', '/images/evolutions/healthy_sprout.png'),
  ('Athletic Runner', 'A Tamagotchi that loves exercise', 3, '{"min_health": 80, "exercise_count": 20, "min_age": 10}', '/images/evolutions/athletic_runner.png'),
  ('Wise Scholar', 'A Tamagotchi that enjoys learning', 3, '{"min_health": 70, "study_hours": 15, "min_age": 10}', '/images/evolutions/wise_scholar.png'),
  ('Chubby Buddy', 'A Tamagotchi that loves to eat', 2, '{"min_happiness": 60, "feeding_count": 30, "min_age": 7}', '/images/evolutions/chubby_buddy.png'),
  ('Zen Master', 'A balanced and peaceful Tamagotchi', 4, '{"min_health": 85, "min_happiness": 85, "min_age": 15}', '/images/evolutions/zen_master.png'),
  ('Mystic Creature', 'A rare and mysterious evolution', 7, '{"min_health": 90, "min_happiness": 90, "min_age": 30, "special_food_count": 5}', '/images/evolutions/mystic_creature.png'),
  ('Golden Guardian', 'An extremely rare evolution with special powers', 9, '{"min_health": 95, "min_happiness": 95, "min_age": 60, "special_activities": 10}', '/images/evolutions/golden_guardian.png');

-- Initial food items
INSERT INTO food_items (name, description, nutrition_value, evolution_influence, price, image_path) VALUES 
  ('Basic Pellet', 'Standard nutritional food', 50, '{}', 10, '/images/food/basic_pellet.png'),
  ('Fresh Apple', 'Healthy fruit option', 70, '{"healthy_evolution": 2}', 25, '/images/food/fresh_apple.png'),
  ('Protein Shake', 'Builds strength and muscle', 65, '{"athletic_evolution": 3}', 30, '/images/food/protein_shake.png'),
  ('Brain Food', 'Enhances intelligence', 60, '{"wise_evolution": 3}', 35, '/images/food/brain_food.png'),
  ('Sweet Cake', 'Delicious but not very nutritious', 30, '{"chubby_evolution": 2}', 15, '/images/food/sweet_cake.png'),
  ('Balanced Meal', 'Perfect nutrition balance', 80, '{"zen_evolution": 2}', 50, '/images/food/balanced_meal.png'),
  ('Mystic Fruit', 'Rare fruit with special properties', 85, '{"mystic_evolution": 3}', 100, '/images/food/mystic_fruit.png'),
  ('Golden Nectar', 'Extremely rare and powerful food', 95, '{"golden_evolution": 4}', 200, '/images/food/golden_nectar.png');
