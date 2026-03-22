import { app } from './app.js';
import { logError, logSuccess } from './utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

const start = async () => {
  const fastify = await app();
  try {
    await fastify.listen({ port: Number(PORT) });
    logSuccess(`Server running at http://localhost:${PORT}/`);
  } catch (err) {
    logError('Server failed to start');
    process.exit(1);
  }
};
start();
