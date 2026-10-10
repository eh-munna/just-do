import { pool } from '../../db';
import type { IProfile } from './profile.interface';

const createProfile = async (payload: IProfile) => {
  const { user_id, gender, phone, address, bio } = payload;
  const result = await pool.query(
    `INSERT INTO profiles ( user_id, gender, phone, address, bio) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, gender, phone, address, bio],
  );
  return result.rows[0];
};

const getProfiles = async () => {
  const result = await pool.query(`SELECT * FROM profiles`);
  return result.rows;
};
// const getUserById = async (id: string) => {
//   const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
//   console.log(result);
//   return result.rows[0];
// };

const profileService = {
  createProfile,
  getProfiles,
  //   getUserById,
};

export default profileService;
