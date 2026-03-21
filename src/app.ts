import Fastify, { type FastifyInstance } from 'fastify';
import { productRoutes } from './routes/products.js';

export async function app() {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  fastify.register(productRoutes, { prefix: '/api' });

  return fastify;
}
