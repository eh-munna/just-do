import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { config } from './config';
import { routeHandler } from './routes/route';

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
