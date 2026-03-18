import Fastify, { type FastifyInstance } from 'fastify';

export async function app() {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' };
  });
  return fastify;
}
