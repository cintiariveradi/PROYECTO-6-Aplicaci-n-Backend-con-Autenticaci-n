const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createTask, readAll, readOne, updateTask, deleteTask } = require("../controllers/taskController");


router.post("/create", authMiddleware, createTask);
router.get("/readall", authMiddleware, readAll);
router.get("/readone/:id", authMiddleware, readOne);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);




module.exports = router;
