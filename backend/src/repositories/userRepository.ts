import { query } from '../providers/db';
import type { User } from '../types';


export async function createUser(email: string, hashedPassword: string) {
const res = await query(
'INSERT INTO users(email, password) VALUES($1, $2) RETURNING id, email, created_at',
[email, hashedPassword]
);
return res.rows[0];
}


export async function findUserByEmail(email: string) {
const res = await query('SELECT * FROM users WHERE email=$1', [email]);
return res.rows[0] as User | undefined;
}


export async function findUserById(id: number) {
const res = await query('SELECT id, email, created_at FROM users WHERE id=$1', [id]);
return res.rows[0] as User | undefined;
}