const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createTask, readAll, readOne, updateTask, deleteTask } = require("../controllers/taskController");

/**
 * @openapi
 * /api/product/create:
 *   post:
 *     tags:
 *       - Task
 *     summary: Crear una tarea (ruta protegida)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudiar Swagger
 *               description:
 *                 type: string
 *                 example: Documentar endpoints en /api-docs
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: pending
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-02-01T00:00:00.000Z
 *     responses:
 *       201:
 *         description: Tarea creada
 *       401:
 *         description: Token inválido o expirado
 */

router.post("/create", authMiddleware, createTask);

/**
 * @openapi
 * /api/product/readall:
 *   get:
 *     tags:
 *       - Task
 *     summary: Listar todas las tareas del usuario (ruta protegida)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       401:
 *         description: Token inválido o expirado
 */

router.get("/readall", authMiddleware, readAll);

/**
 * @openapi
 * /api/product/readone/{id}:
 *   get:
 *     tags:
 *       - Task
 *     summary: Obtener una tarea por ID (ruta protegida)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token inválido o expirado
 */

router.get("/readone/:id", authMiddleware, readOne);

/**
 * @openapi
 * /api/product/update/{id}:
 *   put:
 *     tags:
 *       - Task
 *     summary: Actualizar una tarea por ID (ruta protegida)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudiar Swagger (actualizado)
 *               description:
 *                 type: string
 *                 example: Terminar documentación completa
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: in_progress
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-02-10T00:00:00.000Z
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token inválido o expirado
 */

router.put("/update/:id", authMiddleware, updateTask);
/**
 * @openapi
 * /api/product/delete/{id}:
 *   delete:
 *     tags:
 *       - Task
 *     summary: Eliminar una tarea por ID (ruta protegida)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token inválido o expirado
 */

router.delete("/delete/:id", authMiddleware, deleteTask);




module.exports = router;
