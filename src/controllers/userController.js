const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Faltan datos: username, email y password son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Ya existe un usuario con ese email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Usuario registrado",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error en register", error: error.message });
  }
};

module.exports = { register };
