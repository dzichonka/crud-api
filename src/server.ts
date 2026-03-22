import { app } from './app.js';
import { logError, logSuccess } from './utils/logger.js';

const start = async () => {
  const fastify = await app();
  try {
    await fastify.listen({ port: 3000 });
    logSuccess('Server running at http://localhost:3000/api/products');
  } catch (err) {
    logError('Server failed to start');
    process.exit(1);
  }
};
start();
