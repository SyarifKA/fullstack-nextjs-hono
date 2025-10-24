import * as repo from '../repositories/productRepository';
import type { Product } from '../types';


export async function createProduct(owner_id: number, payload: Partial<Product>) {
const p = await repo.createProduct({ ...(payload as Product), owner_id });
return p;
}


export async function listProducts(page: number, limit: number) {
return repo.getProducts(page, limit);
}


export async function getProduct(id: number) {
return repo.getProductById(id);
}


export async function updateProduct(id: number, patch: Partial<Product>) {
const existing = await repo.getProductById(id);
if (!existing) throw new Error('Not found');
return repo.updateProduct(id, patch);
}


export async function removeProduct(id: number) {
const existing = await repo.getProductById(id);
if (!existing) throw new Error('Not found');
return repo.deleteProduct(id);
}