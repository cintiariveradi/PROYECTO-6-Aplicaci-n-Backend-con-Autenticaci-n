# Proyecto 6 - Backend con Autenticación (JWT)

Backend con Node.js, Express y MongoDB (Mongoose). Incluye autenticación y autorización con JWT y un CRUD de tareas (Task) relacionadas a un usuario.

## Requisitos
- Node.js
- MongoDB (local o Atlas)

## Instalación
```bash
npm install
Variables de entorno
Crea un archivo .env en la raíz:
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/proyecto6mongo
JWT_SECRET=TU_SECRET
JWT_EXPIRES_IN=60d
Ejecutar
npm run dev

Autenticación
Para endpoints protegidos usar header:
Authorization: Bearer <TOKEN>
Endpoints
Usuario
POST /api/user/register
POST /api/user/login
GET /api/user/verifytoken (protegido)
PUT /api/user/update (protegido)
Tareas (Product = Task)
POST /api/product/create (protegido)
GET /api/product/readall (protegido)
GET /api/product/readone/:id (protegido)
PUT /api/product/update/:id (protegido)
DELETE /api/product/delete/:id (protegido)
Estructura de carpetas
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
  server.js