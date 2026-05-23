import type { IncomingMessage, ServerResponse } from 'http';
import { getProducts } from '../services/product.service';
import type { IProduct } from '../types/product.type';

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const urlParts = url?.split('/');
  // const idSegment = urlParts?.[2]
  // const id =
  //   urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;

  const idSegment = urlParts?.[2];
  const id = idSegment ? Number(idSegment) : null;
  if (url === '/products' && req.method === 'GET') {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    const products = getProducts();
    return res.end(JSON.stringify(products));
  }
  if (id !== null && req.method === 'GET') {
    const products = getProducts();
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    return res.end(JSON.stringify(product));
  }
};
