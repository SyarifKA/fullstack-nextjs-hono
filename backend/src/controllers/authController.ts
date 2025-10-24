import { Context } from 'hono';
import * as authService from '../services/authService';


export async function registerHandler(c: Context) {
const body = await c.req.json();
try {
const { user, token } = await authService.register(body.email, body.password);
return c.json({ user, token }, 201);
} catch (err: any) {
return c.json({ message: err.message || 'Error' }, 400);
}
}


export async function loginHandler(c: Context) {
const body = await c.req.json();
console.log(body)
try {
const { user, token } = await authService.login(body.email, body.password);
return c.json({ user, token });
} catch (err: any) {
return c.json({ message: err.message || 'Error' }, 400);
}
}