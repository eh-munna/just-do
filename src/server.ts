import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import path from 'node:path';
import { config } from './config';
import initDB, { pool } from './db';

//directory name
const __dirname = path.resolve();

// port
const port = config.port;

const app: Application = express();

// Express Middleware
app.use(express.json());

// initialize database
initDB();

// ? routes
app.get('/', (req: Request, res: Response) => {
  // res.sendFile(path.resolve(`${__dirname}/`));
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ** create user **
app.post('/users', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *`,
      [name, email, password],
    );
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
// * get all users **
app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// * get user by id **

app.get('/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// ** server start **
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
