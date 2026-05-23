import {
  createServer,
  IncomingMessage,
  ServerResponse,
  type Server,
} from 'http';
import { routeHandler } from './routes/route';

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);

const port = 4000;
server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
