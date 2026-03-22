import { app } from '../app.js';
import { logSuccess, logError } from '../utils/logger.js';

const PORT = Number(process.env.PORT);
if (!PORT) throw new Error('Worker PORT not set');

const startWorker = async () => {
  const fastify = await app();
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    logSuccess(`Worker running on port ${PORT}`);
  } catch (err) {
    logError('Worker failed to start');
    process.exit(1);
  }
};

startWorker();
