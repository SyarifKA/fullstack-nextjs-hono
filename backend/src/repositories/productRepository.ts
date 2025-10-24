import { query } from '../providers/db';
import type { Product } from '../types';


export async function createProduct(product: Product) {
const res = await query(
`INSERT INTO products(title, image, description, price_promo, price)
VALUES($1,$2,$3,$4,$5) RETURNING *`,
[product.title, product.image, product.description, product.pricePromo, product.price]
);
return res.rows[0] as Product;
}

export async function getProducts(page: number, limit: number) {
  const offset = (page - 1) * limit

  const res = await query(
    'SELECT * FROM products ORDER BY id ASC LIMIT $1 OFFSET $2',
    [limit, offset]
  )

  const countRes = await query('SELECT COUNT(*) FROM products')
  const totalItems = Number(countRes.rows[0].count)
  const totalPages = Math.ceil(totalItems / limit)

  // Response terstruktur
  return {
    success: true,
    message: 'success get all products',
    pagination: {
      page,
      limit,
      total_items: totalItems,
      total_pages: totalPages,
    },
    data: res.rows as Product[],
  }
}


export async function getProductById(id: number) {
const res = await query('SELECT * FROM products WHERE id=$1', [id]);
return res.rows[0] as Product | undefined;
}


export async function updateProduct(id: number, patch: Partial<Product>) {
const fields: string[] = [];
const values: any[] = [];
let idx = 1;
for (const [k, v] of Object.entries(patch)) {
fields.push(`${k}=$${idx++}`);
values.push(v);
}
if (fields.length === 0) return getProductById(id);
values.push(id);
const sql = `UPDATE products SET ${fields.join(',')}, updated_at=now() WHERE id=$${idx} RETURNING *`;
const res = await query(sql, values);
return res.rows[0] as Product;
}


export async function deleteProduct(id: number) {
await query('DELETE FROM products WHERE id=$1', [id]);
}