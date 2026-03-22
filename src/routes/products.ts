import type { FastifyInstance } from 'fastify';
import {
  getProduct,
  getProducts,
  postProduct,
} from '../controllers/products.controller.js';
import {
  getProductsSchema,
  getProductSchema,
  postProductSchema,
} from '../schemas/products.schema.js';

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get('/products', { schema: getProductsSchema }, getProducts);

  fastify.get('/products/:productId', { schema: getProductSchema }, getProduct);

  fastify.post('/products', { schema: postProductSchema }, postProduct);
}
