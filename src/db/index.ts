import { Pool } from 'pg';
import { config } from '../config';

const connectionString = config.connectionString;
export const pool = new Pool({
  connectionString,
});

const initDB = async () => {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS users (
      
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(50) NOT NULL,
      password VARCHAR(50) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`,
    );

    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS profiles(

      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      gender VARCHAR(20),
      phone VARCHAR(20),
      address VARCHAR(100),
      bio VARCHAR(200),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`,
    );
    console.log('db initialized successfully');
  } catch (error) {
    console.log(error);
  }
};

export default initDB;
