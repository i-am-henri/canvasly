import { createServer } from 'node:http';
import chalk from 'chalk';
import next from 'next';
import { Server } from 'socket.io';
import handleSlides from './socket/slides';

// standard nextjs serttings
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
    if (dev) {
      // biome-ignore lint: we want to show the connection only in development
      console.log('New connection...');
    }
    socket.on('disconnect', () => {
      // biome-ignore lint: we want to show the disconnection only in development
      console.log('Socket disconnected');
    });

    // handle the socket events
    handleSlides(socket, io);
  });

  httpServer
    .once('error', (err) => {
      // biome-ignore lint: we want to show the error only in development
      console.log(chalk.red(err));
      process.exit(1);
    })
    .listen(port, () => {
      // green message for the development, with a link to the server
      // biome-ignore lint: we want to show the link only in development
      console.log(chalk.greenBright(`🌐 Ready on http://${hostname}:${port}`));
    });
});
