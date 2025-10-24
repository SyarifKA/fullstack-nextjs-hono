import { Context } from 'hono';
import * as service from '../services/productService';


export async function listHandler(c: Context) {
const page = Number(c.req.query('page') || 1)
const limit = Number(c.req.query('limit') || 4)
const data = await service.listProducts(page, limit);
return c.json(data);
}


export async function getHandler(c: Context) {
const id = Number(c.req.param('id'));
const p = await service.getProduct(id);
if (!p) return c.json({ message: 'Not found' }, 404);
return c.json(p);
}


export async function createHandler(c: Context) {
const body = await c.req.json();
const user = (c as any).user;
try {
const p = await service.createProduct(user.id, body);
return c.json(p, 201);
} catch (err: any) {
return c.json({ message: err.message || 'Error' }, 400);
}
}


export async function updateHandler(c: Context) {
const id = Number(c.req.param('id'));
const body = await c.req.json();
const user = (c as any).user;
try {
const p = await service.updateProduct(id, body);
return c.json(p);
} catch (err: any) {
const msg = err.message || 'Error';
if (msg === 'Forbidden') return c.json({ message: msg }, 403);
if (msg === 'Not found') return c.json({ message: msg }, 404);
return c.json({ message: msg }, 400);
}
}


export async function deleteHandler(c: Context) {
const id = Number(c.req.param('id'));
const user = (c as any).user;
try {
await service.removeProduct(id);
return c.json({ message: 'Deleted' });
} catch (err: any) {
const msg = err.message || 'Error';
if (msg === 'Forbidden') return c.json({ message: msg }, 403);
if (msg === 'Not found') return c.json({ message: msg }, 404);
return c.json({ message: msg }, 400);
}
}