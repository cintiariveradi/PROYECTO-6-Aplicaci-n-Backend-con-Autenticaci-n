const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//método register
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
    return res.status(500).json({ message: "Error en el registro", error: error.message });
  }
};

//método login


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      message: "Login exitoso",
      token
    });

  } catch (error) {
    return res.status(500).json({ message: "Error en login", error: error.message });
  }
};

//método verifyToken
const verifyToken = async (req, res) => {
  try {
    return res.json({
      ok: true,
      user: req.user // { id: ... }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error en verifytoken", error: error.message });
  }
};

//método updateUser
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // viene del token
    const { username, email, password } = req.body;

    const updateData = {};

    if (username) updateData.username = username;

    if (email) {
      // Evita duplicados (otro usuario con el mismo email)
      const exists = await User.findOne({ email, _id: { $ne: userId } });
      if (exists) {
        return res.status(409).json({ message: "Ya existe un usuario con ese email" });
      }
      updateData.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    return res.json({
      message: "Usuario actualizado",
      user: updatedUser
    });
  } catch (error) {
    // Manejo de error de índice unique (E11000)
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Email ya registrado" });
    }

    return res.status(500).json({ message: "Error en update", error: error.message });
  }
};

module.exports = { register, login, verifyToken, updateUser };



