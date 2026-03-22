import { randomUUID } from 'node:crypto';
import cluster from 'node:cluster';

const pending = new Map();

if (!cluster.isPrimary) {
  process.on('message', (msg: any) => {
    const { requestId, data, error } = msg;

    const resolve = pending.get(requestId);

    if (resolve) {
      pending.delete(requestId);
      resolve({ data, error });
    }
  });
}
export function sendToMaster(message: any): Promise<any> {
  return new Promise((resolve) => {
    const requestId = randomUUID();

    pending.set(requestId, resolve);

    process.send?.({
      requestId,
      ...message,
    });
  });
}
