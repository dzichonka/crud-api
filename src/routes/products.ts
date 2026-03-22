import type { FastifyInstance } from 'fastify';
import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/products.controller.js';
import {
  productsSchema,
  productBodySchema,
  productIdSchema,
} from '../schemas/products.schema.js';

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get('/products', { schema: productsSchema }, getProducts);

  fastify.get('/products/:productId', { schema: productIdSchema }, getProduct);

  fastify.post('/products', { schema: productBodySchema }, postProduct);

  fastify.put(
    '/products/:productId',
    {
      schema: {
        ...productIdSchema,
        ...productBodySchema,
      },
    },
    putProduct,
  );

  fastify.delete(
    '/products/:productId',
    { schema: productIdSchema },
    deleteProduct,
  );
}
