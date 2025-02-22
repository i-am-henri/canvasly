'use client';

import type { Socket } from '@/types/socket';
import { io } from 'socket.io-client';

const getAuthToken = (): string => {
  // Implementiere hier deine Token-Abruf-Logik
  return localStorage.getItem('token') || '';
};

export const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
  auth: {
    token: getAuthToken(),
  },
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Error handling
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});
