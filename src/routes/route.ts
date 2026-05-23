import type { IncomingMessage, ServerResponse } from 'http';
import { productController } from '../controller/product.controller';

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, 'OK', {
      'content-type': 'text/plain',
    });
    res.end('Test root route');
  } else if (req.url?.startsWith('/products')) {
    productController(req, res);
  }
};
