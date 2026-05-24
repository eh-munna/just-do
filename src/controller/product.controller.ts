import { productService } from '../service/product.service';
import type { Handler } from '../types';
import { sendResponse } from '../utils/utils';

export const productController: Handler = async (req, res) => {
  const url = req.url ?? '/';
  const method = req.method ?? 'GET';

  const urlParts = url.split('/');
  const idSegment = urlParts?.[2];

  const id = idSegment ? String(idSegment) : null;

  if (url === '/products' && method === 'GET') {
    const products = productService.findProducts();
    sendResponse(res, 200, 'application/json', products);
  } else if (id !== null && method === 'GET') {
    const product = productService.findProductById(id);
    sendResponse(res, 200, 'application/json', product);
  } else if (url === '/products' && method === 'POST') {
    const product = await productService.createProduct(req);
    sendResponse(res, 201, 'application/json', product);
  } else if (id !== null && method === 'PUT') {
    const product = await productService.updateProductById(id, req);
    sendResponse(res, 200, 'application/json', product);
  }
};

// const getProducts = () => {
//   const products = productService.findProducts();
//   return products;
// };

// export const productController = {
//   getProducts,
// };
