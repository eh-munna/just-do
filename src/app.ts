import type { Application, Request, Response } from 'express';
import express from 'express';
import path from 'node:path';
import globalErrorHandler from './middlewares/globalErrorHandler';
import logger from './middlewares/logger';
import notFound from './middlewares/notFound';

import profileRoutes from './modules/profiles/profile.routes';
import userRoutes from './modules/users/user.routes';

// Express App
const app: Application = express();

// root directory
const rootDir = path.resolve();

// Express Middleware
app.use(express.json());

// ? routes
app.get('/', logger, (req: Request, res: Response) => {
  // res.sendFile(path.resolve(`${__dirname}/`));
  res.sendFile(path.join(rootDir, 'index.html'));
});

// ** user routes **
app.use('/users', userRoutes);

// ** profile routes **
app.use('/profiles', profileRoutes);

// ** not found **
app.use(notFound);

// ** global error handler **
app.use(globalErrorHandler);

export default app;
