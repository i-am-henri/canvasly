import { createServer } from 'node:http';
import chalk from 'chalk';
import { jwtVerify } from 'jose';
import next from 'next';
import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerSocket,
  ServerToClientEvents,
  SocketData,
  SocketUser,
} from './types/socket';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function verifyToken(session: string | undefined = '') {
  let user: boolean;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    if (payload.userId) {
      user = {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
      };
    } else {
      user = false;
    }
  } catch {
    user = false;
  }
  return user;
}

// standard nextjs settings
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port, turbo: true });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io: ServerSocket = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: '*', // Ersetze dies durch deine tatsächliche Origin
      methods: ['GET', 'POST'],
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) throw new Error('No token provided');

      const user = await verifyToken(token);
      if (!user) throw new Error('Invalid token');

      // Type assertion für das user-Objekt
      socket.data.user = user as SocketUser;
      next();
    } catch (err) {
      const error = err as Error;
      console.error('Authentication error:', error.message);
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    if (dev) {
      console.log('New connection from user:', socket.data.user.id);
    }

    socket.on('slide:update', (data) => {
      // Überprüfe, ob der Benutzer berechtigt ist, die Folie zu aktualisieren
      if (isUserAuthorized(socket.data.user.id, data.presentationId)) {
        socket.broadcast.emit('slide:update', data);
      } else {
        console.error(
          'User not authorized to update slide:',
          socket.data.user.id
        );
      }
    });

    socket.on('disconnect', () => {
      if (dev) {
        console.log('Socket disconnected for user:', socket.data.user.id);
      }
    });

    // handle the socket events
    //handleSlides(socket, io);
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

// Hilfsfunktion zur Überprüfung der Berechtigung
function isUserAuthorized(userId: string, presentationId: string): boolean {
  // Implementiere hier deine Autorisierungslogik
  // z.B. Überprüfung in der Datenbank, ob der Benutzer Zugriff auf die Präsentation hat
  return true; // Placeholder
}
