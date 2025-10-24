// src/providers/dbInit.ts
import { pool } from './db';
import * as fs from 'fs';
import * as path from 'path';

export async function initDatabase() {
  const sqlFile = path.resolve('./src/infrastructure/database/init.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');
  await pool.query(sql);
  console.log('Database initialized');
}
