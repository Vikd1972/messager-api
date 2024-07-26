import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './app';
import config from './config';
import type { ServerToClientEventsType, ClientToServerEventsType } from './typeSocket';
import { handleServerError } from './services/errorHelper';
import { logger } from './utils';

const httpServer = createServer(app);

const io = new Server<ClientToServerEventsType, ServerToClientEventsType>(httpServer, {
  cors: {
    origin: config.urls.clientUrl,
  },
});

io.on('connection', (socket) => {
  socket.on('setMessage', (...options) => {
    logger.info(options);
    socket.broadcast.emit('getMessage', 'A new message has been received');
  });
});

(async () => {
  httpServer.listen(config.server.port, () => {
    // eslint-disable-next-line no-console
    console.log(`
       /===============================\\
      |   Server is listening on ${config.server.port}   |
       \\===============================/
    `);
  });
})();

app.on('error', handleServerError);
