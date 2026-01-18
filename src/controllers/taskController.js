const Task = require("../models/taskModel");

// crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const { 
        title, 
        description, 
        status, 
        priority, 
        dueDate 
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      owner: req.user.id // viene del token
    });

    return res.status(201).json({
      message: "Tarea creada",
      task: newTask
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear tarea", 
        error: error.message });
  }
};
// leer todas las tareas del usuario autenticado
const readAll = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });

    return res.json({
      message: "Tareas del usuario",
      tasks
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al leer tareas", error: error.message });
  }
};

// leer una tarea por id

const readOne = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, owner: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.json({
      message: "Tarea encontrada",
      task
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al leer tarea", error: error.message });
  }
};

// actualizar una tarea por id
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = ["title", "description", "status", "priority", "dueDate"];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.json({
      message: "Tarea actualizada",
      task: updatedTask
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
  }
};


// eliminar una tarea por id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: id, owner: req.user.id });

    if (!deletedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.json({
      message: "Tarea eliminada",
      task: deletedTask
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
  }
};



module.exports = { createTask, readAll, readOne, updateTask, deleteTask };



