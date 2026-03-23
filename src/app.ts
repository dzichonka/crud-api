import Fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';
import { productRoutes } from './routes/products.js';
import { logError } from './utils/logger.js';

export async function app() {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply.code(404);
    logError(`Route '${request.url}' not found.`);
    return reply.send({
      statusCode: 404,
      message: `Route ${request.url} not found.`,
    });
  });

  fastify.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      const statusCode = error.statusCode || 500;
      request.log.error(error);
      logError(
        `Status: ${statusCode}. Internal Server Error, please try again`,
      );

      reply.code(statusCode);
      return reply.send({
        statusCode,
        error:
          statusCode === 500
            ? 'Internal Server Error, please try again'
            : error.name,
        message: error.message,
      });
    },
  );

  fastify.register(productRoutes, { prefix: '/api' });

  return fastify;
}
