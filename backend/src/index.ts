import { Hono } from 'hono';
import { cors } from 'hono/cors';
import * as dotenv from 'dotenv';
import {
  registerHandler,
  loginHandler,
} from './controllers/authController';
import {
  listHandler,
  getHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} from './controllers/productController';
import { authMiddleware } from './middlewares/auth';
import { initDatabase } from './providers/dbInit';

dotenv.config();

const app = new Hono();

// ✅ Aktifkan CORS
app.use(
  '*',
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // jika ingin mengirim cookies atau auth header
  })
);

// Root
app.get('/', (c) => c.text('Hello Hono + Bun + JWT'));

// Auth
app.post('/register', registerHandler);
app.post('/login', loginHandler);

// Products public
app.get('/products', listHandler);
app.get('/products/:id', getHandler);

// Products protected
app.post('/products', authMiddleware, createHandler);
app.put('/products/:id', authMiddleware, updateHandler);
app.delete('/products/:id', authMiddleware, deleteHandler);

// Start server
const port = Number(process.env.PORT || 8000);

await initDatabase();

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`✅ Server running on http://localhost:${port}`);
