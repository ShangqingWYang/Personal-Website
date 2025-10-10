import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('🌍 User connected:', socket.id);
  socket.on('message', (msg) => io.emit('message', msg));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🌐 OneEarth server running on port ${PORT}`));
