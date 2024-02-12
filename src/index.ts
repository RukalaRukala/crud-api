import { server } from './server/server';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';

dotenv.config();

const PORT = parseInt(process.env.PORT || '8000');
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ PORT: `${PORT + i}` });
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork({ PORT: `${PORT + worker.id}` });
  });
} else {
  server.listen(process.env.PORT, () => {
    console.log(
      `Worker ${cluster.worker?.id} is running on http://localhost:${process.env.PORT}`
    );
  });
}
