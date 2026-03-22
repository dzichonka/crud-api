import http from 'node:http';
import { logSuccess } from '../utils/logger.js';

export function loadBalancer(basePort: number, workersCount: number) {
  let current = 0;

  http
    .createServer((req, res) => {
      const targetPort = basePort + 1 + (current % workersCount); // 4001, 4002, 4003
      current++;

      const proxy = http.request(
        {
          port: targetPort,
          method: req.method,
          path: req.url,
          headers: req.headers,
        },
        (workerRes) => {
          res.writeHead(workerRes.statusCode!, workerRes.headers);
          workerRes.pipe(res);
        },
      );

      req.pipe(proxy);
    })
    .listen(basePort);

  logSuccess(`Load balancer running on http://localhost:${basePort}/`);
}
