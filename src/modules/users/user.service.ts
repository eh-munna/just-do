import { pool } from '../../db';
import type { IUser } from './user.interface';

const createUser = async (payload: IUser) => {
  const { name, email, password } = payload;
  const result = await pool.query(
    `INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *`,
    [name, email, password],
  );
  return result.rows[0];
};

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};
const getUserById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  console.log(result);
  return result.rows[0];
};

const userService = {
  createUser,
  getUsers,
  getUserById,
};

export default userService;
