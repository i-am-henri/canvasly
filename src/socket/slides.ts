import { decrypt } from '@/lib/session';
import type { Server, Socket } from 'socket.io';
import { z } from 'zod';

const presentationConnectSchema = z.object({
  id: z.string(),
  token: z.string(),
});

export default function handleSlides(socket: Socket, io: Server) {
  // add the user to the room for the presentation
  socket.on('presentation:connect', async (data) => {
    const parse = await presentationConnectSchema.safeParseAsync(data);

    if (!parse.success) {
      console.log(parse.error);
      return;
    }

    const { id, token } = parse.data;

    // checks if the user is able to see the presentation
    const { userId } = (await decrypt(token)) as { userId?: string };

    // add the user to the room
    socket.join(id);

    io.to(id).emit('presentation:connected');
  });

  socket.on('slide:update', async (data) => {
    // update the slide in the database
    console.log('slide:update', data);
  });

  socket.on('presentation:update', async (data) => {
    // update the presentation in the database
    console.log('presentation:update', data);
  });
}
