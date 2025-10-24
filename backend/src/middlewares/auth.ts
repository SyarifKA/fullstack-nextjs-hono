import { Context } from 'hono';
import { verifyToken } from '../services/authService';


export async function authMiddleware(c: Context, next: () => Promise<any>) {
const auth = c.req.header('authorization') || '';
if (!auth.startsWith('Bearer ')) return c.json({ message: 'Unauthorized' }, 401);
const token = auth.slice(7);
const payload = verifyToken(token);
if (!payload) return c.json({ message: 'Invalid token' }, 401);
// attach to context
(c as any).user = { id: payload.userId, email: payload.email };
await next();
}