import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepository';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';


export async function register(email: string, password: string) {
const existing = await findUserByEmail(email);
if (existing) throw new Error('Email already registered');
const hashed = await bcrypt.hash(password, 10);
const user = await createUser(email, hashed);
const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
return { user, token };
}


export async function login(email: string, password: string) {
const user = await findUserByEmail(email);
console.log('User found:', user); 
if (!user) throw new Error('Invalid credentials');
 console.log('Password from FE:', password);
  console.log('Password hash from DB:', (user as any).password);
const ok = await bcrypt.compare(password, (user as any).password);
  console.log('Compare result:', ok);
if (!ok) throw new Error('Invalid credentials');
const token = jwt.sign({ userId: (user as any).id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
return { user: { id: (user as any).id, email: user.email }, token };
}


export function verifyToken(token: string) {
try {
return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
} catch (err) {
return null;
}
}