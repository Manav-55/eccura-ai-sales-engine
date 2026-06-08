import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { registerSocketHandlers } from './socket/handlers';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(helmet());
app.use(express.json());

registerSocketHandlers(io);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

httpServer.listen(5000, () => console.log('Server running on :5000'));