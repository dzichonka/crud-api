import type { FastifyInstance } from 'fastify';
import { getProduct, getProducts } from '../controllers/products.controller.js';

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get('/products', getProducts);

  fastify.get('/products/:productId', getProduct);
}
