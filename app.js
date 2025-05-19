import express from 'express';
import formRoutes from './routes/formRoutes.js';
import adminRoutes from './routes/adminRoute.js';
import girlRoutes from './routes/girlFormRoute.js';
import boyRoutes from './routes/boyFormRoute.js';
import connectDB from './db.js';

import cors from 'cors';
import { errorMiddleware } from './middlewares/error.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Fixed CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
    ], // Allow multiple ports and removed trailing slash
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(morgan('dev'));
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// your routes here
app.use('/api/form', formRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/girl', girlRoutes);
app.use('/api/boy', boyRoutes);

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

app.use(errorMiddleware);

app.listen(port, () =>
  console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.')
);
