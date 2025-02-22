import type { Server as HTTPServer } from 'node:http';
import type { Socket as NetSocket } from 'node:net';
import type { NextApiResponse } from 'next';
import type { Server as IOServer } from 'socket.io';
import type { Socket as IOSocket } from 'socket.io-client';

export interface SocketUser {
  id: string;
  email: string;
  name: string;
}

export interface ServerToClientEvents {
  'slide:update': (data: SlideData) => void;
  'presentation:connected': () => void;
}

export interface ClientToServerEvents {
  'slide:update': (data: SlideData) => void;
  'presentation:connect': (data: PresentationConnectData) => void;
}

export interface SlideData {
  id: string;
  presentationId: string;
  content: unknown;
  updatedAt: Date;
}

export interface PresentationConnectData {
  id: string;
  token: string;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: SocketUser;
}

export type Socket = IOSocket<ServerToClientEvents, ClientToServerEvents>;
export type ServerSocket = IOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export interface SocketIOResponse extends NextApiResponse {
  socket: NetSocket & {
    server: HTTPServer & {
      io: ServerSocket;
    };
  };
}
