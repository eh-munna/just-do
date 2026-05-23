import { readFileSync } from 'fs';
import type { IncomingMessage } from 'http';
import path from 'path';
import type { IProduct } from '../types/product.types';
import { bodyParser } from '../utils/utils';

const filePath = path.join(`${process.cwd()}`, `/src/db/db.json`);

const getProducts = (): IProduct[] => {
  const products = readFileSync(filePath, 'utf-8');
  return JSON.parse(products);
};

const createProduct = async (payload: IncomingMessage) => {
  const products = getProducts();
  const id = products.length + 1;
  const body = await bodyParser<Omit<IProduct, 'id'>>(payload);
  const newProduct: IProduct = {
    id,
    name: body.name,
    category: body.category,
    price: body.price,
    inStock: true,
  };
  products.push(newProduct);
  return products;
};

const findProducts = () => {
  return getProducts();
};

const findProductById = (id: number) => {
  return getProducts().find((product: IProduct) => product.id === id);
};

export const productService = {
  createProduct,
  findProducts,
  findProductById,
};
