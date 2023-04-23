import { Task } from "../models/todo.model.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    // const task = new Task({title});
    // task.save();
    await Task.create({
      title,
      description,
      user: req.user,
    });
    return res
      .status(201)
      .json({ success: true, message: "task added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(404).json({ success: false, message: "Login first" });
    }

    const tasks = await Task.find({ user: userId });
    return res.status(201).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const completeTask = async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "task not found" });
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({ success: true, message: "task updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(500)
        .json({ success: false, message: "task not found" });
    await task.deleteOne();
    res
      .status(201)
      .json({ success: true, message: "Task has been deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
