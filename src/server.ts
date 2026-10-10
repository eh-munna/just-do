import app from './app';
import { config } from './config';
import initDB from './db';

// port
const port = config.port;

// ** server start **

const startServer = async () => {
  try {
    await initDB();

    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
