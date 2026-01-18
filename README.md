# 🚀 Proyecto 6 – Backend con Autenticación JWT y MongoDB

Backend desarrollado con **Node.js**, **Express** y **MongoDB** que implementa autenticación y autorización mediante **JSON Web Tokens (JWT)**, junto con un sistema CRUD de tareas asociadas a cada usuario.

Este proyecto forma parte del **Bootcamp de Desarrollo Web Full Stack (DWFS)**.

---

## 🧰 Tecnologías utilizadas

- Node.js  
- Express  
- MongoDB  
- Mongoose  
- JSON Web Tokens (JWT)  
- bcryptjs  
- dotenv  
- cors  
- nodemon  

---

## ✨ Características principales

✔ Registro y login de usuarios con contraseña encriptada  
✔ Autenticación mediante JWT  
✔ Protección de rutas con middleware  
✔ CRUD completo de tareas por usuario  
✔ Relación Usuario → Tareas  
✔ Variables de entorno seguras  
✔ Arquitectura MVC (models, controllers, routes)  

---

## 🗂 Estructura del proyecto

src/
├── config/
│ └── db.js
├── controllers/
│ ├── userController.js
│ └── taskController.js
├── middlewares/
│ └── authMiddleware.js
├── models/
│ ├── userModel.js
│ └── taskModel.js
├── routes/
│ ├── userRoutes.js
│ └── productRoutes.js
└── server.js

---

## ⚙️ Instalación

### 1️⃣ Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyecto6mongo
2️⃣ Instalar dependencias
npm install
3️⃣ Crear archivo .env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/proyecto6mongo
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=60d
4️⃣ Ejecutar proyecto
npm run dev
🔐 Autenticación
Las rutas protegidas requieren el siguiente header:
Authorization: Bearer <token>
👤 Endpoints de Usuario
Método	Endpoint	Descripción
POST	/api/user/register	Registrar usuario
POST	/api/user/login	Login y obtención de token
GET	/api/user/verifytoken	Verificar token
PUT	/api/user/update	Actualizar usuario
📝 Endpoints de Tareas (Productos)
Método	Endpoint	Descripción
POST	/api/product/create	Crear tarea
GET	/api/product/readall	Listar tareas
GET	/api/product/readone/:id	Obtener tarea
PUT	/api/product/update/:id	Actualizar tarea
DELETE	/api/product/delete/:id	Eliminar tarea
🔒 Seguridad implementada
Contraseñas encriptadas con bcrypt
Tokens JWT con expiración
Middleware de autenticación
Variables sensibles protegidas con .env
.env excluido mediante .gitignore
📦 Scripts disponibles
npm run dev     # Ejecuta en modo desarrollo
npm start       # Ejecuta en modo producción
👩‍💻 Autora
Cintia Rivera
Bootcamp DWFS – 2026