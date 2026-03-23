import cluster from 'node:cluster';
import os from 'node:os';
import { randomUUID } from 'node:crypto';

import { loadBalancer } from './loadBalancer.js';
import { logSuccess } from '../utils/logger.js';
import type { Product } from '../types/product.js';

const BASE_PORT = Number(process.env.PORT) || 4000;
const cpuCount = os.availableParallelism();
const workersCount = cpuCount - 1;

if (cluster.isPrimary) {
  logSuccess(`Primary cluster setting up ${workersCount} workers...`);

  const products: Product[] = [];

  const handlers = {
    GET_ALL: () => products,

    GET_ONE: ({ id }: any) => {
      return products.find((p) => p.id === id) || null;
    },

    CREATE: ({ data }: any) => {
      const newProduct = {
        id: randomUUID(),
        ...data,
      };

      products.push(newProduct);
      return newProduct;
    },

    UPDATE: ({ id, data }: any) => {
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) {
        throw new Error('NOT_FOUND');
      }

      products[index] = { id, ...data };
      return products[index];
    },

    DELETE: ({ id }: any) => {
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) {
        throw new Error('NOT_FOUND');
      }

      products.splice(index, 1);
      return 'DELETED';
    },
  };

  cluster.on('message', (worker, msg: any) => {
    const { type, requestId, ...payload } = msg;

    const handler = handlers[type as keyof typeof handlers];

    if (!handler) {
      worker.send({
        requestId,
        error: 'UNKNOWN_ACTION',
      });
      return;
    }

    try {
      const result = handler(payload);

      worker.send({
        requestId,
        data: result,
      });
    } catch (error: any) {
      worker.send({
        requestId,
        error: error.message || 'SERVER_ERROR',
      });
    }
  });

  for (let i = 0; i < workersCount; i++) {
    cluster.fork({
      PORT: String(BASE_PORT + i + 1),
    });
  }

  loadBalancer(BASE_PORT, workersCount);
} else {
  import('../server.js');
}
