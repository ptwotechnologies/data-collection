import express from 'express'
import formRoutes from './routes/formRoutes.js'
import adminRoutes from './routes/adminRoute.js'
import connectDB from './db.js';

import cors from 'cors'
import { errorMiddleware } from './middlewares/error.js'
import morgan from 'morgan'
import dotenv from 'dotenv'


dotenv.config({ path: './.env', });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 5000;


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,  
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan('dev'))
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// your routes here

app.use('/api/form',formRoutes)
app.use('/api/admin',adminRoutes)

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.use(errorMiddleware);


app.listen(port, () => console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.'));