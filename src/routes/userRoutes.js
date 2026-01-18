
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");


const { register, login, verifyToken } = require("../controllers/userController");


router.post("/register", register);
router.post("/login", login);
router.get("/verifytoken", authMiddleware, verifyToken);


module.exports = router;
