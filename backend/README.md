

```markdown
# Backend – API Server Hono + Bun

## 🧰 Teknologi  
- Hono (framework web)  
- Bun sebagai runtime (optional bisa dengan Node.js)  
- PostgreSQL (atau DB lain sesuai config)  
- JWT untuk autentikasi  
- Struktur folder: `controllers/`, `services/`, `repositories/`, `middlewares/`, `infrastructure/database/`

## 🔖 Fitur Endpoint  
- `POST /register` → buat user baru  
- `POST /login` → login user + token JWT  
- `GET /products` → daftar produk (pagination)  
- `GET /products/:id` → detail produk  
- `POST /products` → tambah produk (autentikasi diperlukan)  
- `PUT /products/:id` → update produk (auth)  
- `DELETE /products/:id` → hapus produk (auth)  

## ⚙️ Instalasi & Jalankan  
```bash
cd backend
npm install        # atau bun install
cp .env.example .env
# edit .env: set DATABASE_URL, JWT_SECRET, PORT, dll
bun run dev
