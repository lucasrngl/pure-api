import { createServer } from 'node:http';
import { handler } from './app.js';

const PORT = process.env.PORT || 3000;

const server = createServer();

server.on('request', handler);

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
