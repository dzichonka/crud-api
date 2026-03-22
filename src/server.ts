import { app } from './app.js';
import { color } from './utils/color.js';

const start = async () => {
  const fastify = await app();
  try {
    await fastify.listen({ port: 3000 });
    console.log(
      `${color(32, 'Server running at http://localhost:3000/api/products')}`,
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
