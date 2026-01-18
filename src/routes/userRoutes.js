
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");



const { register, login, verifyToken, updateUser } = require("../controllers/userController");

/**
 * @openapi
 * /api/user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: cintia
 *               email:
 *                 type: string
 *                 example: cintia@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       409:
 *         description: Email ya registrado
 */


router.post("/register", register);

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Iniciar sesión y obtener JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: cintia@mail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso (retorna token)
 *       401:
 *         description: Credenciales inválidas
 */


router.post("/login", login);
/**
 * @openapi
 * /api/user/verifytoken:
 *   get:
 *     tags:
 *       - User
 *     summary: Verificar token (ruta protegida)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o expirado
 */

router.get("/verifytoken", authMiddleware, verifyToken);

/**
 * @openapi
 * /api/user/update:
 *   put:
 *     tags:
 *       - User
 *     summary: Actualizar datos del usuario (ruta protegida)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: cintia2
 *               email:
 *                 type: string
 *                 example: cintia2@mail.com
 *               password:
 *                 type: string
 *                 example: nuevoPassword123
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       401:
 *         description: Token inválido o expirado
 *       409:
 *         description: Email ya registrado
 */


router.put("/update", authMiddleware, updateUser);



module.exports = router;
