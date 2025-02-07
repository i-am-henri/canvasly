import { createServer } from 'node:http';
import chalk from 'chalk';
import consola from 'consola';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port, turbo: true });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('New connection...');
    socket.on('disconnect', () => {
      consola.log('Socket disconnected');
    });
    socket.on('hello', (data) => {
      consola.log('Received hello message:', data);
      socket.emit('hello', 'world');
    });
  });

  httpServer
    .once('error', (err) => {
      console.log(chalk.red(err));
      process.exit(1);
    })
    .listen(port, () => {
      console.log(chalk.greenBright(`🌐 Ready on http://${hostname}:${port}`));
    });
});
