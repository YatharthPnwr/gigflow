import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import errorMiddleware from './middleware/error.middleware';

const app = express();

const origin = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'];

app.use(cors({ 
  origin: origin, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/health', (_req, res) => res.json({ success: true, message: 'Server is running' }));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorMiddleware);

export default app;
