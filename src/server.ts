import { app } from './app.js';

const start = async () => {
  const fastify = await app();
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is listening on port 3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
