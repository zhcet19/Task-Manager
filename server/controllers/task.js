const express = require("express");
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

const GetTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("status");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const AddTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status } = req.body;
  try {
    const task = new Task({ title, description, status, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const UpdateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { taskId } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const DeleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  GetTask,
  AddTask,
  UpdateTask,
  DeleteTask,
};
